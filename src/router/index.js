import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import localforage from "localforage";
import Booking from "../components/views/Booking";
import Home from "../components/views/Home";
import Cart from "../components/views/Cart";
import Contact from "../components/views/Contact";
import Gallery from "../components/views/Gallery";
import RegisterComponent from "../components/userService/RegisterComponent";
import Login from "../components/views/Login";
import Admin from "../components/views/Admin";
import Configure from "../components/views/admin/Configure";
import Orders from "../components/views/admin/Orders";
import { setNoPermission } from "../redux/user";

const Index = function () {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [paths] = useState([
    { path: "/", componentInstance: Home },
    { path: "/booking", componentInstance: Booking },
    { path: "/cart", componentInstance: Cart },
    { path: "/contact", componentInstance: Contact },
    { path: "/gallery", componentInstance: Gallery },
    { path: "/login", componentInstance: Login },
    {
      path: "/register",
      componentInstance: RegisterComponent,
      requiredAuth: true,
    },
    { path: "/admin", componentInstance: Admin, requiredAuth: true },
    {
      path: "/admin/configure",
      componentInstance: Configure,
      requiredAuth: true,
    },
    {
      path: "/admin/orders",
      componentInstance: Orders,
      requiredAuth: true,
    },
  ]);

  useEffect(() => {
    const checkUserPermission = async () => {
      const namespace = process.env.REACT_APP_PACKAGE_NAME;
      const foundRoute = paths.find((route) => route.path === pathname);
      const localForageToken = await localforage.getItem(`${namespace}.token`);

      if (foundRoute && foundRoute.requiredAuth && !user && !localForageToken) {
        dispatch(setNoPermission(true));
      }
    };
    checkUserPermission();
  }, [pathname, paths, user, dispatch]);

  return (
    <Routes>
      {paths.map((path) => {
        return (
          <Route
            key={path.path}
            path={path.path}
            element={React.createElement(path.componentInstance)}
          />
        );
      })}
    </Routes>
  );
};

export default Index;
