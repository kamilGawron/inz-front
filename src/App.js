import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import localforage from "localforage";
import { setUser } from "./redux/user";
import RouterView from "./router";
import NoPermissionNeedToLogin from "./components/global/NoPermissionNeedToLogin";

const App = function () {
  const dispatch = useDispatch();
  const { noPermission } = useSelector((state) => state.user);

  useEffect(() => {
    const namespace = process.env.REACT_APP_PACKAGE_NAME;

    const getUserData = async () => {
      const localForageToken = await localforage.getItem(`${namespace}.token`);
      if (localForageToken) {
        dispatch(setUser({ token: localForageToken }));
      }
    };
    getUserData();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App" style={{ minHeight: "100vh" }}>
        {noPermission ? (
          <NoPermissionNeedToLogin />
        ) : (
          <div className="content">
            <RouterView />
          </div>
        )}
      </div>
      <div className="w-full bg-black" style={{ height: "50px" }}>
        footer
      </div>
    </BrowserRouter>
  );
};

export default App;
