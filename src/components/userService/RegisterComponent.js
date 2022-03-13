import { useState } from "react";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Alert from "@mui/material/Alert";
import UiInput from "../global/ui/UiInput";
import ControllerComponent from "../controller/FormController";
import MainButton from "../global/ui/UiButton";

import { registerUser } from "../../services/api/user";

const required = {
  required: "Pole jest wymagane",
};

const registerFormInputs = (getValues) => [
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
  {
    name: "password_repeat",
    placeholder: "Powtórz hasło",
    type: "password",
    rules: {
      ...required,
      validate: (value) => {
        if (value === getValues().password) {
          return true;
        }
        return "Hasła nie zgadzają się";
      },
    },
    Component: UiInput,
  },
];

const Register = function () {
  const { control, formState, getValues, watch, reset } = useForm({
    mode: "onSubmit",
  });
  const [message, setMessage] = useState(null);
  const [visibility, setVisibility] = useState("hidden");

  const onRegisterSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: watch().email,
      password: watch().password,
    };
    const res = await registerUser(userData);
    if (res) {
      setMessage(res.data.message);
      setVisibility("visible");
      setTimeout(() => {
        setVisibility("hidden");
      }, 5000);
      reset();
    }
  };
  return (
    <>
      <div className="m-auto max-w-max mt-5">
        <Alert severity="success" className="mb-5" sx={{ visibility }}>
          {message}
        </Alert>
        <Box className="flex flex-col items-center justify-center">
          {registerFormInputs(getValues).map((input) => (
            <ControllerComponent
              key={input.name}
              input={input}
              control={control}
              formState={formState}
            />
          ))}
          <Box sx={{ mt: 2 }}>
            <MainButton text="Zarejestruj" onClick={onRegisterSubmit} />
          </Box>
        </Box>
      </div>
      <Typography variant="p" component="p" sx={{ mt: 1, textAlign: "center" }}>
        Masz juz konto?
        <Link
          className="ml-2 whitespace-nowrap"
          to="/login"
          style={{ textDecoration: "underline" }}
        >
          Zaloguj się <ArrowForwardIosIcon style={{ fontSize: "1rem" }} />
        </Link>
      </Typography>
    </>
  );
};
export default Register;
