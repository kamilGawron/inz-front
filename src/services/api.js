import axios from "axios";
import localforage from "localforage";
import { setNoPermission } from "../redux/user";
import store from "../redux/store";

const namespace = process.env.REACT_APP_PACKAGE_NAME;

const api = { ...axios };

api.defaults.baseURL = process.env.REACT_APP_API;
api.defaults.headers.common.Accept = "application/json";
api.defaults.headers.common["Content-Type"] = "application/json";
api.defaults.headers.post["Content-Type"] = "multipart/form-data";

const fakeTimeout = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });

api.interceptors.request.use(
  async (config) => {
    const tpmConfig = config;
    const token = await localforage.getItem(`${namespace}.token`);
    if (token) {
      tpmConfig.headers.common.Authorization = `Bearer ${token}`;
    }

    await fakeTimeout();
    return tpmConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    }

    return Promise.reject(response);
  },
  async (error) => {
    const refreshToken = await localforage.getItem(`${namespace}.refreshToken`);

    const originalRequest = error.config;

    const { status } = error.response;

    if (status && (status === 401 || status === 403)) {
      if (status === 403 && !originalRequest.retry) {
        originalRequest.retry = true;

        return axios
          .post("/user/token", {
            refreshToken,
          })
          .then(async (res) => {
            if (res.status === 200) {
              await localforage.setItem(
                `${namespace}.token`,
                res.data.accessToken
              );

              originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
            }
            return axios(originalRequest);
          });
      }
      store.dispatch(setNoPermission(true));
    }
    return Promise.reject(error);
  }
);

export default api;
