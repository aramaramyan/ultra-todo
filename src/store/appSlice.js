import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    users: [],
    currentUser: [],
    isModalOpen: false,
    isLoading: false
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
    addToDoLocal(state, action) {
      state.currentUser[0].toDoesArr = [...state.currentUser[0].toDoesArr, action.payload];
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
    handleLoading(state, action) {
      state.isLoading = action.payload;
    }
  }
});

export const {
  setUsers,
  handleModal,
  addToDoLocal,
  addUserLocal,
  handleLoading,
  setCurrentUser,
  removeCurrentUser,
  handleStatusLocal
} = appSlice.actions;
export default appSlice.reducer;