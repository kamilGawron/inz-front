import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, useState,Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import localforage from "localforage";
import { setNoPermission } from "../redux/user";


const Orders = lazy(() => import("../components/views/admin/Orders"));
const Configure = lazy(() => import("../components/views/admin/Configure"));
const Admin = lazy(() => import("../components/views/Admin"));
const Login = lazy(() => import("../components/views/Login"));
const Gallery = lazy(() => import("../components/views/Gallery"));
const Contact = lazy(() => import("../components/views/Contact"));
const Cart = lazy(() => import("../components/views/Cart"));
const Home = lazy(() => import("../components/views/Home"));
const Booking = lazy(() => import("../components/views/Booking"));
const RegisterComponent = lazy(() => import("../components/userService/RegisterComponent"));


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
    <Suspense fallback={<div>Page is Loading...</div>}>
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
    </Suspense>

  );
};

export default Index;
