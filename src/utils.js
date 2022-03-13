/* eslint-disable import/prefer-default-export */
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getFormErrorMessage = (name, formState) => {
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
