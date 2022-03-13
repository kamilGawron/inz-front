import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const SingleDay = function ({ active, dayNo, onClick, disabled, dayName }) {
  const [day, setDay] = useState("");

  useEffect(() => {
    setDay(dayNo > 9 ? `${dayNo}` : `0${dayNo}`);
  }, [dayNo]);

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={onclick}
        onClick={() => {
          if (!disabled) {
            onClick();
          }
        }}
        className={`${active ? "active" : ""} ${
          disabled ? "disabled" : ""
        } a-singleDay`}
      >
        <div className="a-singleDay__dayName hidden sm:block">{dayName}</div>
        <div>{day}</div>
      </div>
    </div>
  );
};

SingleDay.defaultProps = {
  active: false,
  disabled: false,
  dayNo: 0,
  onClick: () => {},
};
SingleDay.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  dayNo: PropTypes.number,
  onClick: PropTypes.func,
};

export default SingleDay;
