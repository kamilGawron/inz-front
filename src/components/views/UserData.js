import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { saveUserData } from "../../redux/reservation";
import {
  setActiveStep,
  ProgressBarSteps,
  setReadyStep,
} from "../../redux/progressBar";
import UiForm from "../global/ui/UiForm";
import UiTextarea from "../global/ui/UiTextarea";
import MainButton from "../global/ui/UiButton";

const Booking = function ({ onChange }) {
  const [dataToSend, setDataToSend] = useState({});

  const [personalData, setPersonalData] = useState([
    {
      required: true,
      placeholder: "Imię",
      value: "",
      name: "name",
    },
    { required: true, placeholder: "Nazwisko", value: "", name: "surname" },
    {
      required: true,
      placeholder: "Adres e-mail",
      value: "",
      name: "email",
      type: "email",
    },
    { required: true, placeholder: "Telefon", value: "", name: "phone" },
  ]);

  const dispatch = useDispatch();

  const { userData: reservationUserData } = useSelector(
    (state) => state.reservation
  );

  useEffect(() => {
    if (reservationUserData) {
      // fill personal data
      const tmpPersonalData = personalData.map((pd) => {
        const tmpElem = pd;
        if (reservationUserData[pd.name]) {
          tmpElem.value = reservationUserData[pd.name];
        }
        return tmpElem;
      });
      setPersonalData(tmpPersonalData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPersonalDataChange = ({ newFields }) => {
    setPersonalData(newFields);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    await dispatch(saveUserData(dataToSend));
    dispatch(
      setReadyStep({
        step: { name: ProgressBarSteps.SUMMARY },
        ready: true,
      })
    );
    dispatch(setActiveStep(ProgressBarSteps.SUMMARY));
  };

  useEffect(() => {
    const data = {};
    [...personalData].forEach((input) => {
      data[input.name] = input.value;
    });
    setDataToSend(data);
    onChange(data);
  }, [personalData, onChange]);

  return (
    <div className="m-auto  max-w-max text-center">
      <h4 className="font-semibold mb-5">Podaj dane</h4>

      <form onSubmit={onFormSubmit}>
        <div className="my-5">
          <UiForm fields={personalData} onChange={onPersonalDataChange} />
          <div className="p-3">
            <UiTextarea placeholder="Dodatkowe wskazówki dla naszego pracownika..." />
          </div>
        </div>
        <div className="flex justify-end mb-5 p-3">
          <MainButton
            type="submit"
            text="Dalej"
            className="o-booking__nextBtn"
          />
        </div>
      </form>
    </div>
  );
};

Booking.defaultProps = {
  onChange: () => {},
};
Booking.propTypes = {
  onChange: PropTypes.func,
};

export default Booking;
