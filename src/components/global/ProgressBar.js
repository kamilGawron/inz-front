import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setActiveStep } from "../../redux/progressBar";

const ProgressBar = function ({ stepClick }) {
  const { steps } = useSelector((state) => state.progressBar);
  const dispatch = useDispatch();

  const onStepClick = (step) => {
    stepClick(step);
    dispatch(setActiveStep(step.name));
  };

  return (
    <div className="o-progressBar flex max-w-max mb-5">
      {steps.map((step, stepIdx) => {
        return (
          <div
            className={`stepWrapper items-center flex ${
              step.ready ? "ready" : ""
            }`}
            key={step.name}
          >
            <div
              onClick={() => step.ready && onStepClick(step)}
              role="button"
              tabIndex={stepIdx}
              className="relative mx-2 md:mx-0 flex items-center"
            >
              <div className="counter md:hidden mr-1">{stepIdx + 1}</div>
              <div className={`${!step.active ? "hidden" : ""} name  md:block`}>
                {step.name}
              </div>
              <div className={step.active ? "bottomBorder" : ""} />
            </div>
            <div className="divider hidden md:block" />
          </div>
        );
      })}
    </div>
  );
};

ProgressBar.defaultProps = {
  stepClick: () => {},
};
ProgressBar.propTypes = {
  stepClick: PropTypes.func,
};

export default ProgressBar;
