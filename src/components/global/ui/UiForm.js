import React from "react";
import PropTypes from "prop-types";
import UiInput from "./UiInput";
import UiFormContainer from "./UiFormContainer";

const UiForm = function ({ fields, onChange, formTitle }) {
  const onInputChange = ({ text, field }) => {
    if (field.value !== undefined && field.value !== text) {
      if (text.value === field.value) return;
      const newFields = Object.assign(fields);
      newFields.forEach((tmpField) => {
        // eslint-disable-next-line no-param-reassign
        if (tmpField.name === field.name) tmpField.value = text;
      });
      onChange({ text, field, newFields: [...newFields] });
    }
  };
  return (
    <UiFormContainer formTitle={formTitle}>
      <div className="flex flex-wrap">
        {fields.map((field) => {
          return (
            <div className="o-uiForm__input" key={field.placeholder}>
              <UiInput
                type={field.type}
                fullWidth
                placeholder={field.placeholder}
                text={field.value}
                onChange={(e) => onInputChange({ text: e, field })}
                required={field.required}
                name={field.name}
              />
            </div>
          );
        })}
      </div>
    </UiFormContainer>
  );
};
export default UiForm;

UiForm.defaultProps = {
  fields: [],
  onChange: () => {},
  formTitle: "",
};
const Field = PropTypes.shape({
  placeholder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
});

UiForm.propTypes = {
  fields: PropTypes.arrayOf(Field),
  onChange: PropTypes.func,
  formTitle: PropTypes.string,
};
