/* eslint-disable no-loop-func */
import {
  isSameDay,
  setHours,
  isBefore,
  isAfter,
  addMinutes,
  setMinutes,
  setSeconds,
  areIntervalsOverlapping,
  setMilliseconds,
} from "date-fns";

let tmpTime = null;

const setAvailableHours = ({
  openingHours,
  date,
  reservations,
  requiredTimeAmount,
}) => {
  const hours =
    openingHours &&
    openingHours.find((e) => {
      return e.weekDay === date.getDay();
    });

  const startHour = hours && hours.from ? parseInt(hours.from, 10) : 0;
  const endHour = hours && hours.to ? parseInt(hours.to, 10) : 0;

  const sameDayReservations = reservations.filter((e) => {
    return isSameDay(new Date(e.reservationsTime.from), date);
  });

  const allReservationsByDay = sameDayReservations.map(
    (e) => e.reservationsTime
  );

  const dayStartHour = setMinutes(setHours(new Date(date), startHour), 0);
  const dayEndHour = setMinutes(setHours(new Date(date), endHour), 0);

  tmpTime = new Date(dayStartHour);

  const availableHours = [];

  while (isBefore(tmpTime, dayEndHour)) {
    const overlaping = allReservationsByDay.some((reservation) => {
      const leftIntervalEndDate = new Date(tmpTime);
      const leftInterval = {
        start: new Date(tmpTime),
        end: addMinutes(leftIntervalEndDate, requiredTimeAmount),
      };

      const rightInterval = {
        start: new Date(reservation.from),
        end: new Date(reservation.to),
      };

      return areIntervalsOverlapping(leftInterval, rightInterval, {
        inclusive: false,
      });
    });

    if (
      allReservationsByDay.every((reservation) => {
        return !(
          isAfter(tmpTime, new Date(reservation.from)) &&
          isBefore(tmpTime, new Date(reservation.to))
        );
      }) &&
      !overlaping &&
      isBefore(addMinutes(tmpTime, requiredTimeAmount), dayEndHour)
    ) {
      availableHours.push({
        hours: tmpTime.getHours(),
        minutes: tmpTime.getMinutes(),
      });
    }
    tmpTime = setMilliseconds(setSeconds(addMinutes(tmpTime, 15), 0), 0);
  }

  return availableHours;
};

export default setAvailableHours;
