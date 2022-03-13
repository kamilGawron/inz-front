import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import UiButton from "../../global/ui/UiButton";

const SingleReservation = function ({ reservation, onCancel }) {
  return (
    <div
      className="my-2 p-3 o-adminOrders__singleOrder w-full"
      key={reservation.id}
    >
      <div>
        <p className="font-bold">
          {format(new Date(reservation.reservationsTime.from), "HH:mm")}
          {" - "}
          {format(new Date(reservation.reservationsTime.to), "HH:mm")}
        </p>
        <p>
          <span className="font-bold">
            {reservation.userData.name} {reservation.userData.surname}
          </span>
          <span className="font-light text-gray text-sm">
            {" "}
            , tel: {reservation.userData.phone}
          </span>
        </p>
      </div>
      <div className="mt-1">
        {reservation.services.map((service) => {
          return (
            // eslint-disable-next-line no-underscore-dangle
            <p className="mb-1" key={service._id}>
              <span>{service.name} </span>
              <span className="text-gray text-sm">{service.description}</span>
            </p>
          );
        })}
      </div>
      <div className="flex justify-end ">
        <UiButton
          className="w-full md:max-w-max"
          text="Odwołaj"
          onClick={() => onCancel(reservation)}
        />
      </div>
    </div>
  );
};

SingleReservation.defaultProps = {
  reservation: {},
};
SingleReservation.propTypes = {
  reservation: PropTypes.shape({
    reservationsTime: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
    }),
    userData: PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
    }),
    services: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
      })
    ),
  }),
};

export default SingleReservation;
