import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    users: [],
    currentUser: [],
    isModalOpen: false,
    isBoardLoading: false,
    isModalLoading: false
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    addUserLocal(state, action) {
      state.users.push(action.payload);
    },
    setCurrentUser(state, action) {
      state.currentUser = state.users.filter((user) => user.id === action.payload);
    },
    removeCurrentUser(state) {
      state.currentUser = [];
    },
    deleteUserLocal(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    addToDoLocal(state, action) {
      state.currentUser[0].toDoesArr = [...state.currentUser[0].toDoesArr, action.payload];
    },
    updateToDoLocal(state, action) {
      state.currentUser[0].toDoesArr = state.currentUser[0].toDoesArr.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            title: action.payload.title
          };
        }
        return todo;
      });
    },
    deleteToDoLocal(state, action) {
      if (action.payload.status) {
        state.currentUser[0] = {
          ...state.currentUser[0],
          completed: state.currentUser[0].completed - 1,
          toDoesArr: state.currentUser[0].toDoesArr.filter((todo) => todo.id !== action.payload.id)
        };
      } else {
        state.currentUser[0] = {
          ...state.currentUser[0],
          toDoesArr: state.currentUser[0].toDoesArr.filter((todo) => todo.id !== action.payload.id)
        };
      }
    },
    handleStatusLocal(state, action) {
      state.currentUser[0] = {
        ...state.currentUser[0],
        completed: state.currentUser[0].completed + 1,
        toDoesArr: state.currentUser[0].toDoesArr.map((todo) => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              isDone: true
            };
          }
          return todo;
        })
      };
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
  }
});

export const {
  setUsers,
  handleModal,
  addToDoLocal,
  addUserLocal,
  setCurrentUser,
  deleteToDoLocal,
  deleteUserLocal,
  updateToDoLocal,
  removeCurrentUser,
  handleStatusLocal,
  handleBoardLoading,
  handleModalLoading
} = appSlice.actions;
export default appSlice.reducer;