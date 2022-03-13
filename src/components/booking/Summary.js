import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format, add, set } from "date-fns";
import { useNavigate } from "react-router-dom";
import { removeService, clearReservationData } from "../../redux/reservation";
import { resetProgressBar } from "../../redux/progressBar";
import ProductListItem from "../product/ProductListItem";
import MainButton from "../global/ui/UiButton";
import { toggleItemSelect, resetServicesData } from "../../redux/services";
import { saveReservation } from "../../services/api/reservation";
import Modal from "../modal/Modal";
import Loader from "../global/Loader";
import Login from "../userService/LoginComponent";

const Summary = function () {
  const navigate = useNavigate();

  const [postStatus, setPostStatus] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const dispatch = useDispatch();

  const { services, dateTime, userData } = useSelector(
    (state) => state.reservation
  );

  const { user } = useSelector((state) => state.user);

  const totalPrice = services
    .map((e) => e.price * e.amount)
    .reduce((prev, next) => prev + next);

  const totalMinutes = services
    .map((e) => e.time * e.amount)
    .reduce((prev, next) => prev + next);

  const getDayName = (date) => {
    let dayName;
    switch (date.getDay()) {
      case 0:
        dayName = "niedziela";
        break;
      case 1:
        dayName = "poniedziałek";
        break;
      case 2:
        dayName = "wtorek";
        break;
      case 3:
        dayName = "środa";
        break;
      case 4:
        dayName = "czwartek";
        break;
      case 5:
        dayName = "piątek";
        break;
      case 6:
        dayName = "sobota";
        break;
      default:
        break;
    }
    return dayName;
  };

  const onConfimationModalClose = () => {
    navigate("/", { replace: true });

    dispatch(clearReservationData());
    dispatch(resetProgressBar());
    dispatch(resetServicesData());
  };

  const onLoginClick = () => {
    setLoginModalOpen(true);
  };

  const onServiceRemove = (id) => {
    if (services.length > 1) {
      dispatch(removeService({ id }));
      dispatch(toggleItemSelect(id));
    }
  };

  const onOrderSubmit = async () => {
    setPostStatus(true);
    const servicesPostData = services.map((e) => {
      return { productID: e.id, amount: e.amount };
    });

    const dateTo = add(dateTime, { minutes: totalMinutes });

    const reservationTime = {
      from: format(
        set(set(dateTime, { seconds: 0 }), { milliseconds: 0 }),
        "yyyy-MM-dd HH:mm"
      ),
      to: format(
        set(set(dateTo, { seconds: 0 }), { milliseconds: 0 }),
        "yyyy-MM-dd HH:mm"
      ),
    };

    const dataToSent = {
      reservationsTime: reservationTime,
      services: servicesPostData,
      userData,
    };

    await saveReservation(dataToSent);
    setConfirmationModalOpen(true);
    setPostStatus(false);
  };

  return (
    <Loader loading={postStatus}>
      <div>
        <div className="text-center">
          <h4 className="font-semibold">Wybrane usługi</h4>

          <div className="flex flex-col">
            <div>
              {services.map((service) => {
                return (
                  <ProductListItem
                    buttonText="Usuń"
                    hideImage
                    key={service.id}
                    name={service.name}
                    time={service.time * service.amount}
                    price={service.price * service.amount}
                    productButtonClick={() => onServiceRemove(service.id)}
                  />
                );
              })}
              <p className="text-right font-semibold">Suma: {totalPrice} PLN</p>
            </div>
            <h4 className="font-semibold mb-3">Termin</h4>

            <div>
              <span>
                {getDayName(dateTime)}, {format(dateTime, "dd-MM-yyyy, HH:mm")}-
                {format(add(dateTime, { minutes: totalMinutes }), "HH:mm")}
              </span>
            </div>
          </div>
          <div className=" justify-between mt-5">
            <h4 className="font-semibold w-full text-center mb-3">
              Dane zamawiającego
            </h4>

            {userData && (
              <div>
                <div>
                  {userData.name} {userData.surname}
                </div>
                <div>{userData.email}</div>
                <div>{userData.phone}</div>
              </div>
            )}
          </div>
          <div className="w-full mt-7">
            {!user && (
              <p>
                Aby złożyć zamówienie{" "}
                <span
                  tabIndex={0}
                  role="button"
                  onClick={onLoginClick}
                  className="text-feldgrau underline font-semibold"
                >
                  zaloguj się
                </span>
              </p>
            )}
            <MainButton
              fullWidth
              disabled={!user}
              text="Złóż zamówienie"
              onClick={onOrderSubmit}
            />
          </div>
        </div>
      </div>
      <Modal
        open={loginModalOpen}
        setOpen={setLoginModalOpen}
        title="zaloguj się"
      >
        <Login />
      </Modal>
      <Modal
        open={confirmationModalOpen}
        setOpen={onConfimationModalClose}
        title="Podsumowanie"
      >
        <h3 className="font-semibold text-feldgrau text-center w-full mb-3">
          Zamówienie zostało przyjęte!
        </h3>
        <p className="text-center">
          Zapraszamy do naszego salonu {format(dateTime, "dd.MM.yyyy")}
          {" ("}
          {getDayName(dateTime)}
          {") "} o godzinie {format(dateTime, "HH:mm")}
        </p>
      </Modal>
    </Loader>
  );
};

export default Summary;
