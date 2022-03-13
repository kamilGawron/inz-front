/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import PropTypes from "prop-types";
import binIcon from "../../assets/icons/bin.png";

const ServiceInline = function ({ name, time, price, onRemoveClick }) {
  return (
    <div
      className="flex justify-between border p-2 m-3"
      style={{ borderRadius: "10px" }}
    >
      <div>
        <span className="font-semibold mr-3">{name}</span>
        <span className="opacity-75">{time} min</span>
      </div>
      <div className="flex">
        <span className="mr-5">{price} PLN</span>
        <img
          onClick={onRemoveClick}
          src={binIcon}
          alt=""
          style={{ width: "20px" }}
        />
      </div>
    </div>
  );
};
ServiceInline.defaultProps = {
  name: "",
  time: 0,
  price: 0,
  onRemoveClick: () => {},
};
ServiceInline.propTypes = {
  name: PropTypes.string,
  time: PropTypes.number,
  price: PropTypes.number,
  onRemoveClick: PropTypes.func,
};

export default ServiceInline;
