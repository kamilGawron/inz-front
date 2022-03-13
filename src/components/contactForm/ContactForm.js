import { useState, Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import MainButtonComponent from "../global/ui/UiButton";

const required = {
  required: "Pole jest wymagane",
};

const formInputs = [
  {
    name: "name",
    placeholder: "Imię",
    rules: {
      ...required,
    },
  },
  {
    name: "phone",
    placeholder: "Numer telefonu",
    rules: {
      ...required,
      pattern: {
        value:
          /^(?:(?:(?:(?:\+|00)\d{2})?[ -]?(?:(?:\(0?\d{2}\))|(?:0?\d{2})))?[ -]?(?:\d{3}[- ]?\d{2}[- ]?\d{2}|\d{2}[- ]?\d{2}[- ]?\d{3}|\d{7})|(?:(?:(?:\+|00)\d{2})?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}))$/i,
        message: "Nieprawidłowy numer telefonu",
      },
    },
  },
  {
    name: "mail",
    placeholder: "E-mail",
    rules: {
      ...required,
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
        message: "Nieprawidłowy email",
      },
    },
  },
  {
    name: "message",
    placeholder: "Treść wiadomości",
    multiline: true,
    variant: "filled",
    rules: {
      ...required,
    },
  },
];

const ContactForm = function () {
  const initialVisibility = "hidden";
  const { control, handleSubmit, reset, formState } = useForm({
    mode: "onSubmit",
  });
  const [visibility, setVisibility] = useState(initialVisibility);

  const onContactSubmit = () => {
    reset();
    setVisibility("visible");
    setTimeout(() => {
      setVisibility(initialVisibility);
    }, 5000);
  };

  const getFormErrorMessage = (name) => {
    return (
      <small
        style={{
          visibility: formState?.errors[name] ? "visible" : "hidden",
          color: "red",
        }}
      >
        {formState?.errors[name]?.message
          ? formState?.errors[name].message
          : "no errors"}
      </small>
    );
  };
  return (
    <div className="m-auto max-w-max px-3 md:px-0">
      <Alert severity="success" className="m-3" sx={{ visibility }}>
        Wiadomość wysłana! Odpowiemy najszybciej jak to możliwe! :)
      </Alert>
      <form onSubmit={handleSubmit(onContactSubmit)}>
        {formInputs.map((input) => (
          <Fragment key={input.name}>
            <div className="mt-2">
              <Controller
                name={input.name}
                control={control}
                defaultValue=""
                rules={input.rules}
                render={({ value, onChange }) => (
                  <TextField
                    fullWidth
                    placeholder={input.placeholder}
                    value={value}
                    onChange={onChange}
                    multiline={input.multiline}
                    variant={input.variant || "standard"}
                    rows={input.multiline && "4"}
                  />
                )}
              />
            </div>
            <div>{getFormErrorMessage(input.name)}</div>
          </Fragment>
        ))}
        <div className="flex justify-end mt-5">
          <MainButtonComponent fullWidth text="Wyślij" type="submit" />
        </div>
      </form>
    </div>
  );
};
export default ContactForm;
