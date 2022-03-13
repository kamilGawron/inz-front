/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    email: null,
    user: null,
    noPermission: false,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setNoPermission: (state, action) => {
      state.noPermission = action.payload;
    },
  },
});

export const { setUser, setNoPermission, logoutUser } = user.actions;

export default user.reducer;
