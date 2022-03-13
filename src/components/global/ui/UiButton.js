import React from "react";
import PropTypes from "prop-types";

const UiButton = function ({
  text,
  onClick,
  active,
  disabled,
  fullWidth,
  textTiny,
  customStyle,
  type,
  danger,
  className,
}) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      className={`m-mainButton cursor-pointer outline-none font-bold 
        ${active ? "active" : ""}
        ${disabled ? "disabled" : ""}
        ${fullWidth ? "w-full" : ""}
        ${textTiny ? "textTiny" : ""}
        ${danger ? "danger" : ""}
        ${className}
      `}
      onClick={onClick}
      style={customStyle}
    >
      {text}
    </button>
  );
};
UiButton.defaultProps = {
  text: "",
  onClick: () => {},
  active: false,
  disabled: false,
  fullWidth: false,
  textTiny: false,
  customStyle: {},
  type: "button",
  danger: false,
  className: "",
};
UiButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  textTiny: PropTypes.bool,
  danger: PropTypes.bool,
  customStyle: PropTypes.object,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default UiButton;
