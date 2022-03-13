import localforage from "localforage";
import api from "../api";

const jwt = require("jsonwebtoken");

const namespace = process.env.REACT_APP_PACKAGE_NAME;

export const fetchUsers = async (payload) => {
  const res = await api.post("/user", payload);
  return res;
};

export const loginUser = async (payload) => {
  const res = await api.post("/user/login", payload);
  await localforage.setItem(`${namespace}.token`, res.data.token);
  await localforage.setItem(`${namespace}.refreshToken`, res.data.refreshToken);
  await localforage.setItem(
    `${namespace}.tokenExpiration`,
    jwt.decode(res.data.token).exp
  );
  return res;
};

export const registerUser = async (payload) => {
  const res = await api.post("/user/signup", payload);
  return res;
};

export const deleteUser = async (payload) => {
  const res = await api.delete(`/user/${payload.id}`, payload);
  return res;
};

export const logoutUser = async (callback) => {
  const token = await localforage.getItem(`${namespace}.refreshToken`);

  const res = await api.delete(`user/logout`, { token });

  await localforage.removeItem(`${namespace}.refreshToken`);
  await localforage.removeItem(`${namespace}.token`);
  callback();
  return res;
};
