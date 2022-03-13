import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import UiFormContainer from "../global/ui/UiFormContainer";
import UiCheckbox from "../global/ui/UiCheckbox";
import UiTextarea from "../global/ui/UiTextarea";
import UiSelect from "../global/ui/UiSelect";

const AdditionalData = function ({ onChange }) {
  const [intervalAmountMenuItems, setIntervalAmountMenuItems] = useState([]);
  const [intervalTypeMenuItems] = useState([
    { value: 1, name: "dzień" },
    { value: 2, name: "tydzień" },
    { value: 3, name: "miesiąc" },
  ]);
  const [periodService, setPeriodService] = useState(false);

  useEffect(() => {
    const items = [];
    for (let i = 0; i < 31; i += 1) {
      items.push({ value: i, name: `${i}` });
    }
    setIntervalAmountMenuItems(items);
  }, []);

  const onIntervalAmountChange = (interval) => {
    const intervalAmount = intervalAmountMenuItems.find(
      (e) => e.value === interval
    );
    onChange({ intervalAmount: intervalAmount.value });
  };

  const onIntervalTypeChange = (type) => {
    const intervalType = intervalTypeMenuItems.find((e) => e.value === type);
    onChange({ type: intervalType.name });
  };

  const onPeriodServiceChange = (periodState) => {
    setPeriodService(periodState);
    onIntervalAmountChange(1);
    onIntervalTypeChange(1);
  };

  const onTextareaChange = (text) => {
    onChange({ hint: text });
  };

  return (
    <div>
      <UiFormContainer formTitle="Dane dodatkowe">
        <UiCheckbox
          label="Usługa cykliczna"
          checked={periodService}
          onChange={onPeriodServiceChange}
        />
        {periodService && (
          <div className="w-full">
            <div className="w-max flex items-center">
              <p className="mr-3">Powtarzaj co:</p>
              <UiSelect
                initialValue={1}
                menuItems={intervalAmountMenuItems}
                onChange={onIntervalAmountChange}
              />
              <UiSelect
                initialValue={1}
                menuItems={intervalTypeMenuItems}
                onChange={onIntervalTypeChange}
              />
            </div>
          </div>
        )}

        <div className="w-full">
          Dodatkowe wskazówki:
          <UiTextarea
            placeholder="Dodaj dodatkowe wskazówki dla naszego pracownika"
            onChange={onTextareaChange}
          />
        </div>
      </UiFormContainer>
    </div>
  );
};
export default AdditionalData;

AdditionalData.defaultProps = {
  onChange: () => {},
};

AdditionalData.propTypes = {
  onChange: PropTypes.func,
};
