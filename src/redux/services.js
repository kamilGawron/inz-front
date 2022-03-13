/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  services: null,
  mainPageServices: [
    {
      id: uuid(),
      photo: `cut-scissor.svg`,
      title: "Service Description",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non ornare nisl. Aliquam dignissim vel elit sit.      ",
    },
    {
      id: uuid(),
      photo: "hair-comb.svg",
      title: "Service Description",
      description:
        "Lorem ipsum dolor sit amet. Praesent sit amet dolor iaculis erat porttitor cursus. Suspendisse.        ",
    },

    {
      id: uuid(),
      photo: "hairdryer.svg",
      title: "Service Description",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum interdum pharetra lorem ac. ",
    },

    {
      id: uuid(),
      photo: "beard.svg",
      title: "Service Description",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis placerat dui lorem ac.",
    },
  ],
};

export const services = createSlice({
  name: "services",
  initialState,
  reducers: {
    resetServicesData: (state) => {
      state.services = null;
    },
    toggleItemSelect: (state, payload) => {
      const tmp = state.services.map((service) => {
        if (service.id === payload.payload) {
          service.selected = !service.selected;
        }
        return service;
      });

      state.services = tmp;
    },
    setServices: (state, action) => {
      state.services = action.payload;
    },
    deleteServiceFromStore: (state, action) => {
      const tmp = state.services
        .map((e) => ({ ...e }))
        .filter((service) => service.id !== action.payload);

      state.services = tmp;
    },
  },
});

export const {
  resetServicesData,
  toggleItemSelect,
  setServices,
  deleteServiceFromStore,
} = services.actions;

export default services.reducer;
