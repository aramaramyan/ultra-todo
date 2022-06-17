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
    }
  }
});

export const { setUsers } = appSlice.actions;
export default appSlice.reducer;