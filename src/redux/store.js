import { configureStore } from "@reduxjs/toolkit";
import reservationReducer from "./reservation";
import progressBarReducer from "./progressBar";
import servicesReducer from "./services";
import userReducer from "./user";
import reservationsReducer from "./reservations";

const store = configureStore({
  reducer: {
    reservation: reservationReducer,
    progressBar: progressBarReducer,
    services: servicesReducer,
    user: userReducer,
    reservations: reservationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
