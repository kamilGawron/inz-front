import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { getFormErrorMessage } from "../../utils";

const ControllerComponent = function ({ input, control, formState }) {
  return (
    <Fragment key={input.name}>
      <div className="mt-2">
        <Controller
          name={input.name}
          control={control}
          defaultValue=""
          rules={input.rules}
          render={({ value, onChange }) => (
            <input.Component
              fullWidth
              placeholder={input.placeholder}
              value={value}
              onChange={onChange}
              multiline={input.multiline || false}
              variant={input.variant || "standard"}
              rows={input.multiline && "4"}
              text={value}
              type={input.type}
            />
          )}
        />
      </div>
      <div>{getFormErrorMessage(input.name, formState)}</div>
    </Fragment>
  );
};
export default ControllerComponent;
