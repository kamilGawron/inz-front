import { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import UiInput from "../global/ui/UiInput";
import { loginUser } from "../../services/api/user";
import { setUser } from "../../redux/user";
import Loader from "../global/Loader";
import MainButton from "../global/ui/UiButton";
import ControllerComponent from "../controller/FormController";

const required = {
  required: "Pole jest wymagane",
};

const loginFormInputs = [
  {
    name: "email",
    placeholder: "E-mail",
    rules: {
      ...required,
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
        message: "Nieprawidłowy email",
      },
    },
    Component: UiInput,
  },
  {
    name: "password",
    placeholder: "Hasło",
    type: "password",
    rules: {
      ...required,
    },
    Component: UiInput,
  },
];

const Login = function ({ onSuccess }) {
  const { control, reset, formState, watch } = useForm({
    mode: "onSubmit",
  });
  const [reqeustPending, setRequestPending] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageState, setMessageState] = useState("success");
  const [visibility, setVisibility] = useState("hidden");
  const dispatch = useDispatch();
  const onLoginSubmit = async () => {
    const loginData = {
      email: watch().email,
      password: watch().password,
    };
    setRequestPending(true);

    try {
      const res = await loginUser(loginData);
      if (res.request) {
        setMessageState("success");
        setMessage("Pomyślnie zalogowano");
        setVisibility("visible");
        setTimeout(() => {
          setVisibility("hidden");
        }, 5000);
        dispatch(
          setUser({
            token: res.data.token,
            refreshToken: res.data.refreshToken,
          })
        );
        onSuccess();
        reset();
      }
    } catch (err) {
      setMessageState("error");
      setMessage("Wystąpił błąd");
      setVisibility("visible");
      setTimeout(() => {
        setVisibility("hidden");
      }, 5000);
    } finally {
      setRequestPending(false);
    }
  };
  return (
    <Loader loading={reqeustPending}>
      <div className="m-auto max-w-max mt-5">
        {visibility === "visible" ? (
          <Alert severity={messageState} className="mb-5" sx={{ visibility }}>
            {message}
          </Alert>
        ) : (
          ""
        )}

        <Box className="flex flex-col items-center justify-center">
          {loginFormInputs.map((input) => (
            <ControllerComponent
              key={input.name}
              input={input}
              control={control}
              formState={formState}
            />
          ))}
          <Box sx={{ mt: 2 }}>
            <MainButton text="Zaloguj" onClick={onLoginSubmit} />
          </Box>
        </Box>
      </div>
      <Typography variant="p" component="p" sx={{ mt: 1, textAlign: "center" }}>
        Nie masz jeszcze konta?
        <Link
          className="ml-2 whitespace-nowrap"
          to="/register"
          style={{ textDecoration: "underline" }}
        >
          Zarejestruj się <ArrowForwardIosIcon style={{ fontSize: "1rem" }} />
        </Link>
      </Typography>
    </Loader>
  );
};

Login.defaultProps = {
  onSuccess: () => {},
};
Login.propTypes = {
  onSuccess: PropTypes.func,
};

export default Login;
