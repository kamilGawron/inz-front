import { format } from "date-fns";
import api from "../api";

export const saveReservation = async (payload) => {
  const res = await api.post("/orders", payload);
  return res;
};

export const getReservations = async () => {
  const res = await api.get("/orders");
  res.data = res.data.map((e) => {
    // eslint-disable-next-line no-underscore-dangle
    return { ...e, id: e._id };
  });

  return res;
};

export const getReservationsByDate = async (date) => {
  const res = await api.get(`/orders/date/${format(date, "yyyy-MM-dd")}`);

  res.data = res.data.map((e) => {
    // eslint-disable-next-line no-underscore-dangle
    return { ...e, id: e._id };
  });

  return res;
};

export const deleteReservation = async (id) => {
  const res = await api.delete(`/orders/${id}`);
  return res;
};

export default saveReservation;
