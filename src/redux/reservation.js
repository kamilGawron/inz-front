/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { setHours, setMinutes } from "date-fns";

const initialState = {
  date: null,
  dateTime: null,
  services: [],
  userData: null,
  currentDayAvailableHours: undefined,
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState: { ...initialState },
  reducers: {
    setCurrentDayAvailableHours: (state, action) => {
      state.currentDayAvailableHours = [];
      state.currentDayAvailableHours = action.payload;
    },
    setDateTime: (state, action) => {
      const date = new Date(state.date || new Date());

      const dateWithHours = setHours(date, action.payload.hours);
      const completeDate = setMinutes(dateWithHours, action.payload.minutes);

      state.dateTime = completeDate;
    },
    setDate: (state, action) => {
      const date = new Date(action.payload);
      state.date = date;
    },

    addService: (state, action) => {
      const tmp = [...state.services];
      const foundIndex = tmp.findIndex((e) => e.id === action.payload.id);

      if (foundIndex > -1) {
        if (action.payload.amount > 0) {
          tmp[foundIndex] = action.payload;
        } else {
          tmp.splice(foundIndex, 1);
        }
      } else if (action.payload.amount > 0) {
        tmp.push(action.payload);
      }

      state.services = tmp;
    },
    removeService: (state, action) => {
      state.services = state.services.filter(
        ({ id }) => id !== action.payload.id
      );
    },
    saveReservationTime: (state, action) => {
      const reservationDate = new Date(state.date);
      reservationDate.setUTCHours(
        action.payload.hours,
        action.payload.minutes,
        0,
        0
      );

      state.dateTime = reservationDate;
    },
    saveUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearReservationData: (state) => {
      Object.entries(initialState).forEach((entry) => {
        const [key, value] = entry;
        state[key] = value;
      });
    },
  },
});

export const {
  setDate,
  removeService,
  setDateTime,
  addService,
  saveUserData,
  saveReservationTime,
  setCurrentDayAvailableHours,
  clearReservationData,
} = reservationSlice.actions;

export default reservationSlice.reducer;
