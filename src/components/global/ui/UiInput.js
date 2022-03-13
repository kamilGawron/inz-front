import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

import PropTypes from "prop-types";

const UiInput = function ({
  text,
  placeholder,
  fullWidth,
  id,
  onChange,
  error,
  required,
  name,
  type,
}) {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    setInputText(text);
  }, [text]);

  const onInputChange = async (e) => {
    if (e.target.value !== text) {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      <TextField
        error={error}
        value={inputText}
        onChange={onInputChange}
        id={id}
        label={placeholder}
        variant="standard"
        fullWidth={fullWidth}
        required={required}
        name={name}
        type={type}
      />
    </div>
  );
};

export default UiInput;

UiInput.defaultProps = {
  text: "",
  placeholder: "placeholder",
  fullWidth: false,
  id: "input",
  onChange: () => {},
  error: false,
  required: false,
  name: "",
  type: "text",
};
UiInput.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  fullWidth: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  type: PropTypes.string,
};
