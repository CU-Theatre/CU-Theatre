import React, { useEffect, useState } from 'react';
import './EventInfo.scss';
import { CourseEvent } from '../../../../../types/CourseEvent';
import { format } from 'date-fns';
import { useAppContext } from '../../../../../AppContext';
import classNames from 'classnames';
import { events } from '../../../../../utils/events';

interface Props {
  currentEvent: CourseEvent | null;
  setCurrentEvent: (a: CourseEvent | null) => void;
}

export const EventInfo: React.FC<Props> = ({ currentEvent, setCurrentEvent }) => {
  const { setEventInfoIsOpen, eventInfoIsOpen, setEventDetailIsOpen, userState, setCourses } = useAppContext();
  const classes = ['Heels', 'Exotic', 'Stretching', 'Pole Dance', 'Twerk'];
  const someShows = ["Live performance", "Impro shows", "Playback shows"];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  const newCalendarShow = {
    title: currentEvent?.title,
    start: currentEvent?.start,
    end: currentEvent?.end,
  };

  const cancelShowBooking = () => {
    if (currentEvent && userState && currentEvent.start) {
      let currentShow;
  
      switch (currentEvent.title) {
        case "Live performance":
          currentShow = events.mainEvents.livePerf;
          break;
  
        case "Impro shows":
          currentShow = events.mainEvents.impro;
          break;
  
        case "Playback shows":
          currentShow = events.mainEvents.playback;
          break;
  
        default:
          console.log("Невідоме шоу.");
          return;
      }
  
      const guestIndex = currentShow.findIndex(
        (guest) => guest.phone === userState.phoneNumber && 
        format(currentEvent.start, 'dd.MM') === guest.date
      );
  
      if (guestIndex !== -1) {
        currentShow.splice(guestIndex, 1);
        setCourses((prevEvents) => [...prevEvents]
          .filter(someEvent => 
            someEvent.title !== newCalendarShow.title || 
            (newCalendarShow.start && someEvent.start.getTime() !== newCalendarShow.start.getTime())
          )
        );
        console.log("Бронювання скасовано для:", userState.phoneNumber);
      } else {
        console.log("Бронювання не знайдено для цього користувача:", userState.phoneNumber);
      }
  
      setEventDetailIsOpen(false);
      setEventInfoIsOpen(true);
      setCurrentEvent(null);
    }
  };

  const handleCloseClick = () => {
    setEventDetailIsOpen(false);
    setEventInfoIsOpen(true);
    setCurrentEvent(null);
  }

  const bookClassPlace = () => {
    if (currentEvent && userState) {
  
      const newDay = String(currentEvent.start.getDate()).padStart(2, '0');
      const newMonth = String(currentEvent.start.getMonth() + 1).padStart(2, '0');
      const newDate = `${newDay}.${newMonth}`;
      const dayOfWeek = daysOfWeek[currentEvent.start.getDay()];

      let newClass;

      const newClassGuest = {
        id: 0,
        dayOfWeek: dayOfWeek,
        date: newDate,
        guestName: userState?.firstName,
        guestSurname: userState.lastName,
        phone: userState?.phoneNumber,
      };

      switch (currentEvent?.title) {
        case "Heels":
          newClass = events.otherClasses.heels;
          break;
  
        case "Pole Dance":
          newClass = events.otherClasses.poleDance;
          break;
  
        case "Twerk":
          newClass = events.otherClasses.twerk;
          break;

        case "Exotic":
          newClass = events.otherClasses.exotic;
          break;

        default:
          newClass = events.otherClasses.stretching;
          break;
      }

      newClassGuest.id = newClass.length + 1;
      newClass.push(newClassGuest);

      setEventDetailIsOpen(false);
      setEventInfoIsOpen(true);
      setCurrentEvent(null);
    }
  };

  const cancelBooking = () => {
    if (currentEvent && userState) {
      const newDay = String(currentEvent.start.getDate()).padStart(2, '0');
      const newMonth = String(currentEvent.start.getMonth() + 1).padStart(2, '0');
      const newDate = `${newDay}.${newMonth}`;
  
      let currentClass;
  
      switch (currentEvent?.title) {
        case "Heels":
          currentClass = events.otherClasses.heels;
          break;
  
        case "Pole Dance":
          currentClass = events.otherClasses.poleDance;
          break;
  
        case "Twerk":
          currentClass = events.otherClasses.twerk;
          break;
  
        case "Exotic":
          currentClass = events.otherClasses.exotic;
          break;
  
        default:
          currentClass = events.otherClasses.stretching;
          break;
      }
  
      const guestIndex = currentClass.findIndex(guest => guest.phone === userState.phoneNumber && guest.date === newDate);
  
      if (guestIndex !== -1) {
        currentClass.splice(guestIndex, 1);
        console.log("Запис успішно скасовано для:", userState.phoneNumber);
      } else {
        console.log("Запис не знайдено для цього користувача:", userState.phoneNumber);
      }
  
      setEventDetailIsOpen(false);
      setEventInfoIsOpen(true);
      setCurrentEvent(null);
    }
  };

  useEffect(() => {
    if (currentEvent && userState) {
      let newClass;
      const newDay = String(currentEvent.start.getDate()).padStart(2, '0');
      const newMonth = String(currentEvent.start.getMonth() + 1).padStart(2, '0');
      const newDate = `${newDay}.${newMonth}`;

      switch (currentEvent?.title) {
        case "Heels":
          newClass = events.otherClasses.heels;
          break;
  
        case "Pole Dance":
          newClass = events.otherClasses.poleDance;
          break;
  
        case "Twerk":
          newClass = events.otherClasses.twerk;
          break;

        case "Exotic":
          newClass = events.otherClasses.exotic;
          break;

        default:
          newClass = events.otherClasses.stretching;
          break;
      }

      const isGuestAlreadySigned = newClass.some(guest => guest.phone === userState.phoneNumber && guest.date === newDate);

      setAlreadyBooked(isGuestAlreadySigned);
    }
  }, [alreadyBooked, currentEvent, userState]);

  return (
    <div className={classNames('event-info', {'event-open' : eventInfoIsOpen})}>
      <div className='event-info__top'>
        <h4 className='event-info__title'>{currentEvent?.title}</h4>
        <button 
          onClick={handleCloseClick} 
          type='button' 
          className='event-info__close'></button>
      </div>
      <div className='event-info__content'>
        <p className='event-info__date'>
          Event day - {currentEvent && format(currentEvent.start, 'dd.MM')}
        </p>
        <p className='event-info__duration'>
          Event duration - {currentEvent && format(currentEvent.start, 'HH:mm')} - {currentEvent && format(currentEvent.end, 'HH:mm')}
        </p>
        <div className='event-info__prepare'>
          <h5 className='event-info__prepare-text'>Dont forget to take with you</h5>
          <ul className='event-info__list'>
            <li className='event-info__item'>
              Clothes – Make sure to bring comfy clothes because you'll be moving, 
              crawling, and possibly rolling around a lot. Who needs yoga class when you have this?
            </li>
            <li className='event-info__item'>
            Notebook and Pen – You’ll want to jot down all the brilliant ideas that pop into your head. 
            Plus, it’s perfect for doodling when inspiration strikes!
            </li>
            <li className='event-info__item'>
              Charged Phone – A charged phone is essential, not just for selfies, but also for capturing those “Did that really happen?” moments. 
              And who knows, maybe you’ll need to make a quick call to your agent!
            </li>
            <li className='event-info__item'>
              Water – Hydration is key! You’re going to be working hard, and you don’t want to dry up like a raisin. 
              Stay hydrated, stay fabulous!
            </li>
            <li className='event-info__item'>
              Good Mood – This is your secret weapon. A great attitude will get you through anything, even the most intense improv exercises. 
              Plus, it’s contagious – spread those good vibes around!
            </li>
            <li className='event-info__item'>
              Now you're all set for whatever comes your way! 😄
            </li>
          </ul>
        </div>
        {currentEvent && someShows.includes(currentEvent?.title) && (
          <button onClick={cancelShowBooking} className='event-info__button' type='button'>Cancel show booking</button>
        )}
        {currentEvent && classes.includes(currentEvent?.title) && (
          alreadyBooked ? (
            <button onClick={cancelBooking} className='event-info__button' type='button'>Cancel booking</button>
          ) : (
            <button onClick={bookClassPlace} className='event-info__button' type='button'>Sign for a course</button>
          )
        )}
      </div>
    </div>
  );
}