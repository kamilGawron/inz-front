import React from "react";
import { useDispatch } from "react-redux";
import Login from "../userService/LoginComponent";
import { setNoPermission } from "../../redux/user";

const NoPermissionNeedToLogin = function () {
  const dispatch = useDispatch();

  const onLoginSuccess = () => {
    dispatch(setNoPermission(false));
  };
  return (
    <div className="o-noPermission mt-32">
      <p className="text-center font-bold">
        Nie posiadasz dostępu do tego zasobu
      </p>
      <p className="text-center font-medium mt-12">Zaloguj się</p>
      <Login onSuccess={onLoginSuccess} />
    </div>
  );
};
export default NoPermissionNeedToLogin;
