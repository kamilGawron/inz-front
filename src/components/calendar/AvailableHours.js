import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Loader from "../global/Loader";
import SingleReservationTime from "./SingleReservationTime";

const AvailableHours = function ({ onChange }) {
  const { currentDayAvailableHours } = useSelector(
    (state) => state.reservation
  );
  const [dayParts, setDayParts] = useState([
    { from: { hours: 0, minutes: 0 }, name: "rano", slots: [] },
    { from: { hours: 12, minutes: 0 }, name: "popołudnie", slots: [] },
    { from: { hours: 18, minutes: 0 }, name: "wieczór", slots: [] },
  ]);

  useEffect(() => {
    if (!currentDayAvailableHours) return;

    const reverseArray = dayParts.map((e) => e).reverse();

    reverseArray.forEach((e) => {
      e.slots = [];
    });

    currentDayAvailableHours.forEach((hour) => {
      let pushed = false;
      reverseArray.forEach((dayPart) => {
        if (!pushed) {
          if (dayPart.from && dayPart.from.hours < hour.hours) {
            dayPart.slots.push(hour);
            pushed = true;
          } else if (
            !pushed &&
            dayPart.from &&
            dayPart.from.hours <= hour.hours &&
            dayPart.from.minutes <= hour.minutes
          ) {
            dayPart.slots.push(hour);
            pushed = true;
          }
        }
      });

      setDayParts(reverseArray.map((e) => e).reverse());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDayAvailableHours]);

  return (
    <>
      <Loader loading={currentDayAvailableHours === undefined}>
        <div className="flex mt-5 o-availableHours w-full">
          {dayParts.map((dayPart) => {
            return (
              <div className="day-part" key={dayPart.name}>
                <div className="title">{dayPart.name}</div>
                {dayPart.slots &&
                  dayPart.slots.map((slot) => {
                    return (
                      <SingleReservationTime
                        onChange={onChange}
                        key={`${slot.hours}-${slot.minutes}`}
                        slot={slot}
                      />
                    );
                  })}
              </div>
            );
          })}
        </div>
      </Loader>
      {currentDayAvailableHours && currentDayAvailableHours.length === 0 && (
        <div className="text-center">
          Brak dostępnych terminów w wybranym dniu
        </div>
      )}
    </>
  );
};

AvailableHours.defaultProps = {
  onChange: () => {},
};
AvailableHours.propTypes = {
  onChange: PropTypes.func,
};

export default AvailableHours;
