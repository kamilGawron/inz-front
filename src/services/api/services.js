import api from "../api";

const fetchServices = async () => {
  const res = await api.get("/products");
  return res.data.map((e) => {
    // eslint-disable-next-line no-underscore-dangle
    return { ...e, id: e._id };
  });
};

export const deleteService = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res;
};

export default fetchServices;
