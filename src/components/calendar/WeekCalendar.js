import React, { useState, useEffect, useCallback } from "react";
import {
  isMonday,
  previousMonday,
  addDays,
  isSameDay,
  format,
  isBefore,
} from "date-fns";
import PropTypes from "prop-types";
import SingleDay from "./SingleDay";
import chevronIcon from "../../assets/icons/chevron.png";
import getDayName from "../../services/getDayName";

const WeekCalendar = function ({ onChange }) {
  const [weekStartDate, setWeekStartDate] = useState(null);
  const [currentWeekdays, setCurrentWeekdays] = useState(null);
  const [activeDate, setActiveDate] = useState(new Date());

  const handleChange = useCallback(() => {
    onChange(activeDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDate]);

  useEffect(() => {
    handleChange();
  }, [handleChange]);

  useEffect(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0);
    setWeekStartDate(currentDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!weekStartDate) return;
    if (isMonday(weekStartDate)) {
      const weekDates = [];

      for (let i = 0; i < 7; i += 1) {
        weekDates.push(addDays(new Date(weekStartDate), i));
      }
      setCurrentWeekdays(weekDates);

      return;
    }
    setWeekStartDate(previousMonday(weekStartDate));
  }, [weekStartDate]);

  const onPrevWeekClick = () => {
    setWeekStartDate(addDays(new Date(weekStartDate), -7));
  };
  const onNextWeekClick = () => {
    setWeekStartDate(addDays(new Date(weekStartDate), 7));
  };

  return (
    <div>
      {currentWeekdays && (
        <div className="flex flex-col items-center max-w-max o-weeks">
          <div className="flex items-center mb-3">
            <div
              className="mx-3"
              role="button"
              tabIndex={0}
              onClick={onPrevWeekClick}
            >
              <img
                className="chevron-icon"
                src={chevronIcon}
                alt=""
                style={{ transform: "rotate(180deg)" }}
              />
            </div>

            <div>
              <span>{format(currentWeekdays[0], "dd.MM")}</span>
              <span className="mx-3">-</span>
              <span>{format(currentWeekdays[6], "dd.MM")}</span>
            </div>
            <div
              className="mx-3"
              role="button"
              tabIndex={0}
              onClick={onNextWeekClick}
            >
              <img className="chevron-icon" src={chevronIcon} alt="" />
            </div>
          </div>
          <div className="m-weekdays">
            {currentWeekdays.map((day) => {
              return (
                <SingleDay
                  onClick={() => setActiveDate(day)}
                  key={day.getDate()}
                  dayName={getDayName({ date: day, short: true })}
                  dayNo={day.getDate()}
                  active={isSameDay(day, activeDate)}
                  disabled={isBefore(day, addDays(new Date(), -1))}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default WeekCalendar;

WeekCalendar.defaultProps = {
  onChange: () => {},
};
WeekCalendar.propTypes = {
  onChange: PropTypes.func,
};
