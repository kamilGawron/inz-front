import * as React from "react";
import { useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";

const UiSelect = function ({ label, initialValue, menuItems, onChange }) {
  const [value, setValue] = React.useState();
  const [showSelect, setSelectShow] = React.useState(false);

  const handleChange = useCallback(
    (event) => {
      setValue(event.target.value);
      onChange(event.target.value);
    },
    [onChange]
  );

  useEffect(() => {
    setValue(initialValue);
    setSelectShow(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {label && (
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        )}
        {showSelect && (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={label || undefined}
            onChange={handleChange}
          >
            {menuItems &&
              menuItems.map((item) => {
                return (
                  <MenuItem key={item.value} value={item.value}>
                    {item.name}
                  </MenuItem>
                );
              })}
          </Select>
        )}
      </FormControl>
    </Box>
  );
};

export default UiSelect;

const MItem = PropTypes.shape({
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
});

UiSelect.defaultProps = {
  label: null,
  initialValue: null,
  menuItems: [],
  onChange: () => {},
};
UiSelect.propTypes = {
  label: PropTypes.string,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  menuItems: PropTypes.arrayOf(MItem),
  onChange: PropTypes.func,
};
