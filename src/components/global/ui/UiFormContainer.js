import React from "react";
import PropTypes from "prop-types";

const UiFormContainer = function ({ formTitle, children }) {
  return (
    <div className="o-uiForm">
      {formTitle && (
        <h5 className="text-feldgrau font-bold o-uiForm__header">
          {formTitle}
        </h5>
      )}

      <div className="o-uiForm__inputsWrapper">{children}</div>
    </div>
  );
};
export default UiFormContainer;

UiFormContainer.defaultProps = {
  formTitle: "",
  children: null,
};
UiFormContainer.propTypes = {
  formTitle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
