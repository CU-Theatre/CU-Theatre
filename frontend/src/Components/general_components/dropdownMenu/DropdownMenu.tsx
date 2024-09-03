import React, { useState } from "react";
import { DropdownTypes } from "../../../types/DropdownTypes";
import './DropdownMenu.scss';
import classNames from "classnames";
import { Frequency, Weekday } from "rrule";

interface Props {
  options: DropdownTypes[];
  setSelectedWeekday?: (weekday: Weekday) => void;
  setSelectedFreq?: (freq: Frequency) => void;
}

export const DropdownMenu: React.FC<Props> = ({ options, setSelectedWeekday, setSelectedFreq }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [buttonValue, setButtonValue] = useState('Choose your option');

  const handleClickDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  }

  const handleOptionSelect = (option: Weekday | Frequency) => {
    if (setSelectedWeekday && typeof option === 'object' && 'weekday' in option) {
      setSelectedWeekday(option as Weekday);
    } else if (setSelectedFreq) {
      setSelectedFreq(option as Frequency);
    }
  };

  return (
    <div className="dropdown">
      <button
        onClick={handleClickDropdown}
        className="dropdown__button"
        type="button"
      >
        {buttonValue}
      </button>
      <div className={classNames("dropdown__menu", { 'dropdown__menu--active': dropdownVisible })}>
        {options.map(someOption => (
          <p
            key={someOption.title}
            className="dropdown__item"
            onClick={() => {
              handleOptionSelect(someOption.freqOption as Weekday | Frequency)
              setButtonValue(someOption.title)
            }}
          >
            {someOption.title}
          </p>
        ))}
      </div>
    </div>
  );
};