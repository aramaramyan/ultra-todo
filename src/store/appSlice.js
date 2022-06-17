import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    users: [],
    currentUser: null,
    isModalOpen: false,
    isLoading: false
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = state.users.filter((user) => user.id === action.payload);
    },
    removeCurrentUser(state) {
      state.currentUser = null;
    },
    addToDoLocal(state, action) {
      console.log(state.currentUser.toDoes);
      state.currentUser[0].toDoesArr.push(action.payload);
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
  handleLoading,
  setCurrentUser,
  removeCurrentUser
} = appSlice.actions;
export default appSlice.reducer;