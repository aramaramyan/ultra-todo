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
    deleteToDoLocal(state, action) {
      state.currentUser[0].toDoesArr = state.currentUser[0].toDoesArr
        .filter((todo) => todo.id !== action.payload);
    },
    handleStatusLocal(state, action) {
      state.currentUser[0] = {
        ...state.currentUser[0],
        completed: state.currentUser[0].completed + action.payload.number,
        toDoesArr: state.currentUser[0].toDoesArr.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              isDone: action.payload.status
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
  removeCurrentUser,
  handleStatusLocal,
  handleBoardLoading,
  handleModalLoading
} = appSlice.actions;
export default appSlice.reducer;