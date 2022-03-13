import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const UiCheckbox = function ({ label, checked, onChange }) {
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  useEffect(() => {
    setCheckboxChecked(checked);
  }, [checked]);

  const handleChange = useCallback(
    (e) => {
      onChange(e.target.checked);
    },
    [onChange]
  );

  return (
    <FormControlLabel
      control={<Checkbox checked={checkboxChecked} onChange={handleChange} />}
      label={label}
    />
  );
};
export default UiCheckbox;

UiCheckbox.defaultProps = {
  label: "checkbox-label",
  checked: false,
  onChange: () => {},
};

UiCheckbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};
