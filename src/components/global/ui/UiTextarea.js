import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";

import TextareaAutosize from "@mui/material/TextareaAutosize";

const UiTextarea = function ({ placeholder, onChange, text }) {
  const [textAreaText, setTextAreaText] = useState("");

  useEffect(() => {
    setTextAreaText(text);
  }, [text]);

  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <TextareaAutosize
      defaultValue={textAreaText}
      aria-label="empty textarea"
      placeholder={placeholder}
      minRows={3}
      style={{ width: "100%", border: "1px solid rgba(0,0,0,.5)" }}
      onChange={handleChange}
    />
  );
};
export default UiTextarea;

UiTextarea.defaultProps = {
  placeholder: "placeholder",
  text: "",
  onChange: () => {},
};
UiTextarea.propTypes = {
  placeholder: PropTypes.string,
  text: PropTypes.string,
  onChange: PropTypes.func,
};
