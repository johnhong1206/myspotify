import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    gettoken: (state, action) => {
      state.token = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout, gettoken } = userSlice.actions;
export const selectToken = (state) => state.user.token;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
