import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useFirestore from "../services/useFirestore";

const { addUser } = useFirestore();

export const addUserThunk = createAsyncThunk("addUser", ({ userID, fullName }) => {
  addUser(userID, fullName);
});

const appSlice = createSlice({
  name: "app",
  initialState: {
    users: [],
    currentUser: null,
    todoInput: "",
    addUserInput: "",
    todoPlaceholder: "New to-do description",
    addUserPlaceHolder: "Add new user",
    isModalOpen: false,
    isBoardLoading: false,
    isModalLoading: false,
    isAddUserFieldOpen: false,
    isAddTodoFieldOpen: false,
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload.map((item) => {
        const { toDoes, ...user } = item;
        const toDoesArr = Object.keys(toDoes).map((key) => {
          return ({ ...toDoes[key], id: key });
        }).sort((a, b) => {
            return a.endDate - b.endDate;
        }).sort((a, b) => {
          if (a.endDate === 0 && b.endDate === 0) {
            return b.startDate - a.startDate;
          }
          return 0;
        });
        return ({ ...user, toDoesArr });
      });
    },
    handleTodoInput(state, action) {
      state.todoInput = action.payload;
    },
    handleAddUserInput(state, action) {
      state.addUserInput = action.payload;
    },
    handleTodoPlaceholder(state, action) {
      state.todoPlaceholder = action.payload;
    },
    handleAddUserPlaceholder(state, action) {
      state.addUserPlaceHolder = action.payload;
    },
    toggleAddUserField(state, action) {
      state.isAddUserFieldOpen = action.payload;
    },
    toggleAddTodoField(state, action) {
      state.isAddTodoFieldOpen = action.payload;
    },
    setCurrentUser(state, action) {
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].id === action.payload) {
          state.currentUser = i;
          break;
        }
      }
    },
    removeCurrentUser(state) {
      state.currentUser = null;
    },
    deleteUserLocal(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    addToDoLocal(state, action) {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.userID) {
          return {
            ...user,
            toDoesArr: [action.payload.todo, ...user.toDoesArr]
          };
        }
        return user;
      });
    },
    updateToDoLocal(state, action) {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.userID) {
          return {
            ...user,
            toDoesArr: user.toDoesArr.map((todo) => {
              if (todo.id === action.payload.todoID) {
                return {
                  ...todo,
                  title: action.payload.title
                };
              }
              return todo;
            })
          };
        }
        return user;
      });
    },
    deleteToDoLocal(state, action) {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.userID) {
          if (action.payload.endDate) {
            return {
              ...user,
              completed: user.completed - 1,
              toDoesArr: user.toDoesArr.filter((todo) => todo.id !== action.payload.todoID)
            };
          }
          return {
            ...user,
            toDoesArr: user.toDoesArr.filter((todo) => todo.id !== action.payload.todoID)
          };
        }
        return user;
      });
    },
    handleStatusLocal(state, action) {
      state.users = state.users.map((user) => {
        if (user.id === action.payload.userID) {
          return {
            ...user,
            completed: user.completed + 1,
            toDoesArr: user.toDoesArr.map((todo) => {
              if (todo.id === action.payload.todoID) {
                return {
                  ...todo,
                  endDate: action.payload.endDate
                };
              }
              return todo;
            }).sort((a, b) => {
              return a.endDate - b.endDate;
            }).sort((a, b) => {
              if (a.endDate === 0 && b.endDate === 0) {
                return b.startDate - a.startDate;
              }
              return 0;
            })
          };
        }
        return user;
      });
    },
    handleModal(state, action) {
      state.isModalOpen = action.payload;
    },
    handleBoardLoading(state, action) {
      state.isBoardLoading = action.payload;
    },
    handleModalLoading(state, action) {
      state.isModalLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addUserThunk.pending, (state) => {
      state.isBoardLoading = true;
    });
    builder.addCase(addUserThunk.fulfilled, (state, action) => {
      state.isBoardLoading = false;
      state.addUserInput = "";
      state.isAddUserFieldOpen = false;
      state.addUserPlaceHolder = "Add new user";

      const user = {
        id: action.meta.arg.userID,
        fullName: action.meta.arg.fullName,
        toDoesArr: [],
        completed: 0
      };

      state.users = [...state.users, user];
    });
    builder.addCase(addUserThunk.rejected, (state) => {
      state.isBoardLoading = false;
    });
  }
});

export const {
  setUsers,
  handleModal,
  addToDoLocal,
  setCurrentUser,
  deleteToDoLocal,
  deleteUserLocal,
  updateToDoLocal,
  handleTodoInput,
  removeCurrentUser,
  handleStatusLocal,
  handleBoardLoading,
  handleModalLoading,
  toggleAddUserField,
  toggleAddTodoField,
  handleAddUserInput,
  handleTodoPlaceholder,
  handleAddUserPlaceholder
} = appSlice.actions;
export default appSlice.reducer;