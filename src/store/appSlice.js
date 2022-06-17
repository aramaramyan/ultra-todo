import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    users: [],
    currentUser: null,
    isModalOpen: false
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
    handleModal(state, action) {
      state.isModalOpen = action.payload;
    }
  }
});

export const {
  setUsers,
  setCurrentUser,
  removeCurrentUser,
  handleModal } = appSlice.actions;
export default appSlice.reducer;