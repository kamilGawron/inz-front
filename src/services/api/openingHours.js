import api from "../api";

const getOpeningHours = async () => {
  const res = await api.get("/opening-hours");
  return res;
};

export default getOpeningHours;
