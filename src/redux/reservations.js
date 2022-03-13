/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservations: null,
};

export const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    setReservations: (state, action) => {
      state.reservations = action.payload;
    },
  },
});

export const { setReservations } = reservationsSlice.actions;

export default reservationsSlice.reducer;
