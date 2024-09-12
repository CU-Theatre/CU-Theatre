import { Frequency, RRule, Weekday } from "rrule";
import { frequency, weekDays } from "../../../../../utils/calendarDropdowns";
import { DropdownMenu } from "../../../dropdownMenu";
import './CalendarModal.scss';
import { dramaCourse } from "../../../../../utils/courses";
import React, { useState } from "react";
import { CourseType } from "../../../../../types/CourseType";
import classNames from "classnames";

interface Props {  
  setCourses: React.Dispatch<React.SetStateAction<CourseType['courseTime']>>;
  setModalIsOpen:  React.Dispatch<React.SetStateAction<boolean>>;
  modalIsOpen: boolean;
}

export const CalendarModal: React.FC<Props> = ({ setCourses , setModalIsOpen, modalIsOpen}) => {
  const [selectedWeekday, setSelectedWeekday] = useState<Weekday | null>(null);
  const [selectedFreq, setSelectedFreq] = useState<Frequency | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const form = document.getElementById('eventForm') as HTMLFormElement;
    const title = (form.querySelector('input[name="title"]') as HTMLInputElement).value;
    const startDateTime = new Date((form.querySelector('input[name="start"]') as HTMLInputElement).value);
    const endDateTime = new Date((form.querySelector('input[name="end"]') as HTMLInputElement).value);
    const weekOfMonth = Math.ceil(startDateTime.getDate() / 7);

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!selectedFreq) {
      console.error("Frequency must be selected");
      setError("Frequency must be selected");
      return;
    }

    if (!selectedWeekday && selectedFreq !== Frequency.DAILY) {
      console.error("Weekday must be selected");
      setError("Weekday must be selected");
      return;
    }

    const ruleOptions = {
      freq: selectedFreq,
      dtstart: startDateTime,
      until: new Date(Date.UTC(2025, 7, 31, 16, 30, 0)), 
      ...(selectedFreq !== Frequency.DAILY && selectedWeekday && { byweekday: [selectedWeekday.nth(weekOfMonth)] }),
    };
  
    const rule = new RRule(ruleOptions);

    const eventObject = {
      title,
      start: startDateTime,
      end: endDateTime,
      rrule:  rule,
    };

    setCourses(prevCourseTime => [...prevCourseTime, eventObject]);
    setError(null)

    console.log("Event added:", eventObject);
    console.log("All events:", dramaCourse.courseTime);
  };

  return (
    <div className={classNames('calendar-modal', {'calendar-modal--open': modalIsOpen})}>
      <div>
        <button 
          className="calendar-modal__close" 
          onClick={() => setModalIsOpen(false)} 
          type="button"></button>
        
      </div>
      <form className="calendar-modal__form" id="eventForm">
        <label className="calendar-modal__label">
          Event title
          <input type="text" className="calendar-modal__input" name="title" required/>
        </label>
        <label className="calendar-modal__label">
          Start time
          <input type="datetime-local" className="calendar-modal__input" name="start" required/>
        </label>
        <label className="calendar-modal__label">
          End time
          <input type="datetime-local" className="calendar-modal__input" name="end" required/>
        </label>
        <label className="calendar-modal__label">
          Repeat an event
          <DropdownMenu options={frequency} setSelectedFreq={setSelectedFreq}/>
        </label>
        <div className="calendar-modal__label">
          Choose event day
          <DropdownMenu options={weekDays} setSelectedWeekday={setSelectedWeekday}/>
        </div>
        {error && (
          <p className="calendar-modal__error">Error: {error}</p>
        )}
        <button type="submit" onClick={onSubmit} className="calendar-modal__button">Submit</button>
      </form>
    </div>
  );

};