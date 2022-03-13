import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import Services from "./Services";
import ProgressBar from "../global/ProgressBar";
import MainButton from "../global/ui/UiButton";
import setAvailableHours from "../../services/availableHours";
import { getReservations } from "../../services/api/reservation";
import getOpeningHours from "../../services/api/openingHours";
import MainLayout from "../layouts/MainLayout";

import {
  setDate,
  setDateTime,
  setCurrentDayAvailableHours,
} from "../../redux/reservation";
import {
  setActiveStep,
  ProgressBarSteps,
  setReadyStep,
} from "../../redux/progressBar";

import WeekCalendar from "../calendar/WeekCalendar";
import AvailableHours from "../calendar/AvailableHours";
import Summary from "../booking/Summary";
import UserData from "./UserData";

const Booking = function () {
  const { activeStep } = useSelector((state) => state.progressBar);
  const [openingHours, setOpeningHours] = useState(null);
  const { steps } = useSelector((state) => state.progressBar);
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);
  const { services: selectedServices } = useSelector(
    (state) => state.reservation
  );

  const fetchOpeningHours = async () => {
    const hours = await getOpeningHours();
    setOpeningHours(hours);
  };

  useEffect(() => {
    fetchOpeningHours();
  }, []);

  return (
    <MainLayout>
      <div className="flex justify-center flex-col w-full items-center mt-9 o-booking">
        <Box className="flex flex-col items-center" sx={{ maxWidth: "890px" }}>
          <ProgressBar />
          {activeStep === 1 && (
            <div>
              <Services />
              {services && services[0] && (
                <div className="flex justify-end mb-5 mt-10">
                  <MainButton
                    className="o-booking__nextBtn"
                    text="Dalej"
                    disabled={!steps[1].ready}
                    onClick={() =>
                      dispatch(setActiveStep(ProgressBarSteps.DATETIME))
                    }
                  />
                </div>
              )}
            </div>
          )}
          {activeStep === 2 && (
            <div className="flex flex-col items-center w-full">
              <h4 className="font-semibold mb-5">Wybierz termin</h4>

              <WeekCalendar
                onChange={async (e) => {
                  await dispatch(setCurrentDayAvailableHours(undefined));

                  if (!openingHours) {
                    await setOpeningHours();
                  }

                  const reservations = await getReservations();

                  const requiredTimeAmount =
                    selectedServices.length === 1
                      ? selectedServices[0].time
                      : selectedServices
                          .map((service) => service.time)
                          .reduce((a, b) => a + b);

                  await dispatch(
                    setCurrentDayAvailableHours(
                      setAvailableHours({
                        openingHours: openingHours && openingHours.data,
                        date: e,
                        reservations: reservations.data,
                        requiredTimeAmount,
                      })
                    )
                  );

                  dispatch(setDate(e));
                }}
              />
              <AvailableHours
                className="border"
                onChange={async (e) => {
                  await dispatch(setDateTime(e));
                  if (e.hours) {
                    dispatch(
                      setReadyStep({ step: { name: ProgressBarSteps.DETAILS } })
                    );
                  }
                }}
              />
              <div className="flex justify-end mb-5 md:mt-9 w-full">
                <MainButton
                  className="o-booking__nextBtn"
                  text="Dalej"
                  disabled={!steps[2].ready}
                  onClick={() => {
                    dispatch(setActiveStep(ProgressBarSteps.DETAILS));
                  }}
                />
              </div>
            </div>
          )}
          {activeStep === 3 && (
            <div>
              <UserData />
            </div>
          )}
          {activeStep === 4 && (
            <div className="w-full">
              <Summary />
            </div>
          )}
        </Box>
      </div>
    </MainLayout>
  );
};

export default Booking;
