import React, { useState } from "react";
import './ClassCreating.scss';
import { createClass } from "../../../api/classesApi";
import { useTokenLocalStorage } from "../../../hooks/useLocalStorage";

export const ClassCreatingForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
    description: '',
    icon: '',
    courseId: '',
    freq: 'WEEKLY',
    interval: 1,
    days: [] as string []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [token] = useTokenLocalStorage();

  const weekDays = [
    {
      dayName: 'Monday',
      dayVal: 'MO'
    },
    {
      dayName: 'Tuesday',
      dayVal: 'TU'
    },
    {
      dayName: 'Wednesday',
      dayVal: 'WE'
    },
    {
      dayName: 'Thursday',
      dayVal: 'TH'
    },
    {
      dayName: 'Friday',
      dayVal: 'FR'
    },
    {
      dayName: 'Saturday',
      dayVal: 'SA'
    },
    {
      dayName: 'Sunday',
      dayVal: 'SU'
    },
  ];

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      days: checked
        ? [...prevData.days, value]
        : prevData.days.filter((day) => day !== value)
    }));
  };

  const formatToISO = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      start: formatToISO(formData.start),
      end: formatToISO(formData.end),
    };
    console.log('Submitted data:', formattedData);

    createClass(formattedData, token)
    .then(res => {
      console.log('Submitted data:', formattedData, res);
    })
    .catch(err => {
      console.log(err);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="class-form">
      <h3 className="class-form__title">Create new Class</h3>

      <label className="class-form__label">
        Title:
        <input 
          type="text" 
          name="title"
          value={formData.title} 
          onChange={handleChange} 
          className="class-form__input"
        />
      </label>

      <label className="class-form__label">
        Start Date and Time:
        <input 
          type="datetime-local" 
          name="start" 
          value={formData.start} 
          onChange={handleChange} 
          className="class-form__input" 
          />
      </label>

      <label className="class-form__label">
        End Date and Time:
        <input 
          type="datetime-local" 
          name="end" 
          value={formData.end} 
          onChange={handleChange} 
          className="class-form__input" 
        />
      </label>

      <label className="class-form__label">
        Description:
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange}
          className="class-form__input"
        />
      </label>

      <label className="class-form__label">
        Icon:
        <input 
          type="text" 
          name="icon" 
          value={formData.icon} 
          onChange={handleChange}
          className="class-form__input"
        />
      </label>

      <label className="class-form__label">
        Course ID:
        <input 
          type="number" 
          name="courseId" 
          value={formData.courseId} 
          onChange={handleChange}
          className="class-form__input"
        />
      </label>

      <label className="class-form__label">
        Frequency:
        <select 
          name="freq" 
          value={formData.freq} 
          onChange={handleChange}
          className="class-form__input"
        >
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
        </select>
      </label>

      <label className="class-form__label">
        Interval:
        <input 
          type="number" 
          name="interval" 
          min="1" 
          value={formData.interval} 
          onChange={handleChange} 
          className="class-form__input"
        />
      </label>

      <fieldset className="class-form__fieldset">
        <legend className="class-form__legend">Select Days:</legend>
        {weekDays.map(day => (
          <label key={day.dayVal} className="class-form__label">
            <input 
              type="checkbox" 
              name="days" 
              value={day.dayVal} 
              checked={formData.days.includes(day.dayVal)} 
              onChange={handleDaysChange} 
              className="class-form__input"
            />
            {day.dayName}
          </label>
        ))}
      </fieldset>

      <button className="class-form__button" type="submit">Submit</button>
    </form>
  );
};