import React, { useState } from "react";
import {
  getReservationsByDate,
  deleteReservation,
} from "../../../services/api/reservation";
import AdminLayout from "../../admin/AdminPanelLayout";
import WeekCalendar from "../../calendar/WeekCalendar";
import Loader from "../../global/Loader";
import SingleReservation from "./SingleReservation";
import Modal from "../../modal/Modal";

const Orders = function () {
  const [currentDateReservations, setCurrentDateReservations] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);

  const [requestState, setRequestState] = useState("loading");
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReservationRequestState, setCancelReservationRequestState] =
    useState("idle");
  const [reservationToBeCancelled, setReservationToBeCancelled] =
    useState(null);

  const onReservationCancelRequest = (reservation) => {
    setReservationToBeCancelled(reservation);
    setCancelModalOpen(true);
  };
  const onReservationConfirm = async (reservation) => {
    setCancelReservationRequestState("loading");
    const res = await deleteReservation(reservation.id);
    if (res.status === 200) {
      setCancelReservationRequestState("idle");
      setCancelModalOpen(false);

      setRequestState("loading");
      const getReservationsResponse = await getReservationsByDate(currentDate);
      setCurrentDateReservations(getReservationsResponse.data);
      setRequestState("idle");
    }
  };

  return (
    <AdminLayout>
      <div className="o-adminOrders">
        <WeekCalendar
          onChange={async (e) => {
            setCurrentDate(e);

            setRequestState("loading");
            const res = await getReservationsByDate(e);

            setCurrentDateReservations(res.data);

            setRequestState("idle");
          }}
        />

        {requestState === "loading" && (
          <div className="mt-10">
            <Loader loading />
          </div>
        )}

        {requestState === "idle" &&
          currentDateReservations &&
          currentDateReservations.length === 0 && (
            <div className="my-5">Brak rezerwacji </div>
          )}

        {requestState === "idle" &&
          currentDateReservations &&
          currentDateReservations.length > 0 && (
            <div className="o-adminOrders__ordersWrapper w-full">
              {currentDateReservations.map((reservation) => {
                return (
                  <SingleReservation
                    key={reservation.id}
                    reservation={reservation}
                    onCancel={onReservationCancelRequest}
                  />
                );
              })}
            </div>
          )}
        <Modal
          open={cancelModalOpen}
          setOpen={setCancelModalOpen}
          title="Uwaga!"
        >
          <Loader loading={cancelReservationRequestState === "loading"}>
            <h3 className="font-semibold text-feldgrau text-center w-full mb-3">
              Czy na pewno chcesz anulować wybraną rezerwację?
            </h3>
            <div>
              <SingleReservation
                onCancel={onReservationConfirm}
                reservation={reservationToBeCancelled}
              />
            </div>
          </Loader>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default Orders;
