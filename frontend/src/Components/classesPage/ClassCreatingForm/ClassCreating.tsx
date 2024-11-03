import React, { useEffect, useState } from "react";
import './ClassCreating.scss';
import { createClass, getClass, updateClass } from "../../../api/classesApi";
import { useTokenLocalStorage } from "../../../hooks/useLocalStorage";
import { useAppContext } from "../../../AppContext";
import { ClassesAPI } from "../../../types/ClassesAPI";
import classNames from "classnames";

export const ClassCreatingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
    description: '',
    icon: '',
    freq: 'WEEKLY',
    interval: 1,
    days: [] as string []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [token] = useTokenLocalStorage();
  const { editingEvent, editingEventId, setEditingEvent, setEditingEventId, setFormClosed, formClosed } = useAppContext();

  const weekDays = [
    {
      dayName: 'Monday',
      dayVal: 'MONDAY'
    },
    {
      dayName: 'Tuesday',
      dayVal: 'TUESDAY'
    },
    {
      dayName: 'Wednesday',
      dayVal: 'WEDNESDAY'
    },
    {
      dayName: 'Thursday',
      dayVal: 'THURSDAY'
    },
    {
      dayName: 'Friday',
      dayVal: 'FRIDAY'
    },
    {
      dayName: 'Saturday',
      dayVal: 'SATURDAY'
    },
    {
      dayName: 'Sunday',
      dayVal: 'SUNDAY'
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

  const handleCancelEditing = () => {
    setFormData(
      {
        title: '',
        start: '',
        end: '',
        description: '',
        icon: '',
        freq: 'WEEKLY',
        interval: 1,
        days: [] as string []
      }
    )
    setEditingEvent(false);
    setEditingEventId(0);
  };

  const formatToLocalDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16); // "YYYY-MM-DDThh:mm"
  };

  useEffect(() => {
    if (editingEventId !== 0) {
      getClass(editingEventId, token)
        .then((res) => {
          const currentEditEvent = res as ClassesAPI;
  
          if (res) {
            const formattedData = {
              title: currentEditEvent.title,
              start: formatToLocalDateTime(currentEditEvent.start),
              end: formatToLocalDateTime(currentEditEvent.end),
              description: currentEditEvent.description,
              icon: currentEditEvent.icon,
              freq: currentEditEvent.freq,
              interval: currentEditEvent.interval ? currentEditEvent.interval : 1,
              days: [...currentEditEvent.days],
            }
            
            console.log(formattedData)
            setFormData({...formattedData})
          }
        })
        .catch(err => console.log('Failed to load class', err))
    }
  }, [editingEventId, token]);

  const formatToISO = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    if (!editingEvent) {
      const formattedData = {
        ...formData,
        start: formatToISO(formData.start),
        end: formatToISO(formData.end),
      };

      createClass(formattedData, token)
      .then(res => {
        console.log('Submitted data:', formattedData, res);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      const formattedData = {
        ...formData,
        id: editingEventId,
        start: formatToISO(formData.start),
        end: formatToISO(formData.end),
      };

      updateClass(editingEventId, formattedData, token)
      .then(res => {
        console.log('Submitted data:', formattedData, res);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
    }


  };

  return (
    <div className="class-form">
      <h3 
        className={classNames("class-form__title", {
          'class-form__title--arrow-down': formClosed,
          'class-form__title--arrow-up': !formClosed
        })}
        onClick={() => setFormClosed(!formClosed)}
      >
        {editingEvent ? 'Edit' : 'Create new'} Class
      </h3>

      <form 
        onSubmit={handleSubmit} 
        className={classNames("class-form__form", {"class-form__form--closed": formClosed})} 
        id="classCreating"
      >

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
        {editingEvent && (
          <button 
            className="class-form__button" 
            onClick={handleCancelEditing}
            type="button"
            >
              Cancel
            </button>
        )}
      </form>
    </div>
  );
};