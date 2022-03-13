import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { isSameDay } from "date-fns";

const SingleReservationTime = function ({ onChange, slot }) {
  const { dateTime, date } = useSelector((state) => state.reservation);

  const activeHours = {
    hours: new Date(dateTime).getHours(),
    minutes: new Date(dateTime).getMinutes(),
  };
  return (
    <div>
      <div
        onClick={() => onChange(slot)}
        tabIndex={0}
        role="button"
        className={`border single-slot ${
          slot.hours === activeHours.hours &&
          slot.minutes === activeHours.minutes &&
          isSameDay(dateTime, date)
            ? "active"
            : ""
        }`}
        key={`${slot.hours}-${slot.minutes}`}
      >
        {slot.hours > 9 ? slot.hours : `0${slot.hours}`}:
        {slot.minutes > 9 ? slot.minutes : `0${slot.minutes}`}
      </div>
    </div>
  );
};

SingleReservationTime.defaultProps = {
  onChange: () => {},
  slot: {},
};
SingleReservationTime.propTypes = {
  onChange: PropTypes.func,
  slot: PropTypes.shape({ hours: Number, minutes: Number }),
};

export default SingleReservationTime;
