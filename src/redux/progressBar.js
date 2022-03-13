/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const ProgressBarSteps = {
  SERVICES: "Usługi",
  DATETIME: "Termin",
  DETAILS: "Szczegóły",
  SUMMARY: "Podsumowanie",
};
Object.freeze(ProgressBarSteps);

const initialState = {
  steps: [
    {
      name: ProgressBarSteps.SERVICES,
      ready: true,
      active: true,
    },
    {
      name: ProgressBarSteps.DATETIME,
      ready: false,
      active: false,
    },
    {
      name: ProgressBarSteps.DETAILS,
      ready: false,
      active: false,
    },
    {
      name: ProgressBarSteps.SUMMARY,
      ready: false,
      active: false,
    },
  ],
  activeStep: 1,
};

export const progressBar = createSlice({
  name: "progressBar",
  initialState: { ...initialState },
  reducers: {
    resetProgressBar: (state) => {
      state.steps = { ...initialState }.steps;
      state.activeStep = { ...initialState }.activeStep;
    },
    setProgressBarStepsState: (state, action) => {
      state.steps = action.payload;
    },
    setActiveStep: (state, action) => {
      const newActiveItemName = action.payload;

      const tmpSteps = state.steps;
      tmpSteps.forEach((step, stepIdx) => {
        step.active = false;
        if (step.name === newActiveItemName) {
          step.active = true;
          state.activeStep = stepIdx + 1;
        }
      });
      state.steps = tmpSteps;
    },
    setReadyStep: (state, action) => {
      const tmpSteps = state.steps;
      const { step, ready = true } = action.payload;

      for (let i = 0; i < state.steps.length; i += 1) {
        tmpSteps[i].ready = true;
        if (tmpSteps[i].name === step.name) {
          tmpSteps[i].ready = ready;
          break;
        }
      }

      state.steps = tmpSteps;
    },
  },
});

export const { setActiveStep, setReadyStep, resetProgressBar } =
  progressBar.actions;

export default progressBar.reducer;
