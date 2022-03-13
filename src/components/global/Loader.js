import React from "react";
import PropTypes from "prop-types";
import DefaultLoaderComponent from "./ui/UiLoader";

const Loader = function ({ children, loading }) {
  return (
    <div className={`${loading ? "relative o-loader" : ""} w-full`}>
      {loading && (
        <div className="w-full absolute left-0 top-0 h-full z-50 flex justify-center items-center ">
          <DefaultLoaderComponent />
        </div>
      )}
      <div className={`${loading ? "o-loader__content" : ""} w-full`}>
        {children}
      </div>
    </div>
  );
};

Loader.defaultProps = {
  children: null,
  loading: false,
};
Loader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  loading: PropTypes.bool,
};

export default Loader;
