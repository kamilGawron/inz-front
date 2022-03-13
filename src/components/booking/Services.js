import React from "react";
import { useSelector } from "react-redux";
import ServiceTile from "../serivcetile/ServiceTile";

const Services = function () {
  const { services } = useSelector((state) => state.services);
  const { services: selectedServices } = useSelector(
    (state) => state.reservation
  );

  return (
    <div
      className="flex flex-wrap justify-between mb-5"
      style={{ maxWidth: "768px" }}
    >
      {services.map((tile) => {
        return (
          <ServiceTile
            service={tile}
            key={tile.id}
            active={selectedServices.findIndex((e) => e.id === tile.id) > -1}
          />
        );
      })}
    </div>
  );
};

export default Services;
