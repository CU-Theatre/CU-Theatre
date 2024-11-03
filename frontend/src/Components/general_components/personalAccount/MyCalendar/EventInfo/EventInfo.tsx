import React, { useEffect, useState } from 'react';
import './EventInfo.scss';
import { CourseEvent } from '../../../../../types/CourseEvent';
import { format, isBefore } from 'date-fns';
import { useAppContext } from '../../../../../AppContext';
import classNames from 'classnames';
import { events } from '../../../../../utils/events';
import { Guest } from '../../../../../types/Events';
import { ClassesAPI } from '../../../../../types/ClassesAPI';
import useCheckClassPage from '../../../../../hooks/useCheckClassPage';
import { GroupedLesson } from '../../../../../types/GroupedLesson';
import { DeleteClassModal } from './PreDeleteModal';

interface Props {
  currentEvent: ClassesAPI | CourseEvent | null;
  setCurrentEvent: (a: ClassesAPI | CourseEvent | null) => void;
  setGroupedTrainings?: React.Dispatch<React.SetStateAction<GroupedLesson[] | undefined>>;
}

type PriceType = 'groupClass' | 'privateClass' | 'privateForTwo';

export const EventInfo: React.FC<Props> = ({ currentEvent, setCurrentEvent, setGroupedTrainings }) => {
  const { setEventInfoIsOpen, eventInfoIsOpen, setEventDetailIsOpen, userState, setCourses, currentShows, setEditingEvent, setEditingEventId } = useAppContext();
  const classes = ['Heels', 'Exotic', 'Stretching', 'Pole Dance', 'Twerk'];
  const someShows = ["Live performance", "Impro shows", "Playback shows"];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [isPastEvent, setIsPastEvent] = useState(false);
  const [isCurrentPageCLass, setIsCurrentPageClass] = useState(false);
  const prices = currentEvent?.title === 'Heels' || currentEvent?.title === 'Twerk' || currentEvent?.title === 'Stretching' 
    ? {
      groupClass: '15',
      privateClass: '40',
      privateForTwo: '25',
    } : {
      groupClass: '20',
      privateClass: '50',
      privateForTwo: '35',
    };
  const [selectedPrice, setSelectedPrice] = useState<PriceType>('privateClass');
  const [paymentType, setPaymentType] = useState('Card');
  const [modalVisible, setModalVisible] = useState(false);

  useCheckClassPage(setIsCurrentPageClass);

  useEffect(() => {
    if (currentEvent) {
      const now = new Date();
      const isPast = isBefore(new Date(currentEvent.start), now);
      setIsPastEvent(isPast);
    }
  }, [currentEvent]);

  const newCalendarShow = {
    title: currentEvent?.title,
    start: currentEvent?.start,
    end: currentEvent?.end,
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleEditClass = () => {
    setEventDetailIsOpen(false);
    setEventInfoIsOpen(true);
    setEditingEvent(true);
    if (currentEvent?.id) setEditingEventId(currentEvent?.id)
    setCurrentEvent(null);
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
        (guest: Guest) => guest.phone === userState.phoneNumber && 
        format(currentEvent.start, 'dd.MM') === guest.date
      );
  
      if (guestIndex !== -1) {
        currentShow.splice(guestIndex, 1);
        setCourses((prevEvents) => [...prevEvents]
          .filter(someEvent => 
            someEvent.title !== newCalendarShow.title || 
            (newCalendarShow.start && someEvent.start.getTime() !== new Date(newCalendarShow.start).getTime())
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
    if (currentEvent && userState && !isPastEvent) {
      const startDate = new Date(currentEvent.start);
      const newDay = String(startDate.getDate()).padStart(2, '0');
      const newMonth = String(startDate.getMonth() + 1).padStart(2, '0');
      const newDate = `${newDay}.${newMonth}`;
      const dayOfWeek = daysOfWeek[startDate.getDay()];

      let newClass;

      const newClassGuest: Guest = {
        id: 0,
        dayOfWeek: dayOfWeek,
        date: newDate,
        guestName: userState?.firstName,
        guestSurname: userState.lastName,
        phone: userState?.phoneNumber,
        paymentType: paymentType,
        classPrice: prices[selectedPrice],
        peoplesPerClass: selectedPrice,
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
      const startDate = new Date(currentEvent.start);
      const newDay = String(startDate.getDate()).padStart(2, '0');
      const newMonth = String(startDate.getMonth() + 1).padStart(2, '0');
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
      const startDate = new Date(currentEvent.start);
      const newDay = String(startDate.getDate()).padStart(2, '0');
      const newMonth = String(startDate.getMonth() + 1).padStart(2, '0');
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
      {modalVisible && (
        <DeleteClassModal setGroupedTrainings={setGroupedTrainings} classId={currentEvent?.id} setModalVisible={setModalVisible} />
      )}
      <div className='event-info__top'>
        {isCurrentPageCLass && (
          <>
            <button 
              type="button" 
              className="event-info__delete-button" 
              onClick={handleOpenModal}
            ></button>
            <button 
              type='button' 
              className='event-info__edit-button'
              onClick={handleEditClass}
            ></button>
          </>
        )}
        <h4 className='event-info__title'>{currentEvent?.title}</h4>
        <button 
          onClick={handleCloseClick} 
          type='button' 
          className='event-info__close'></button>
      </div>
      <div className='event-info__content'>
        <p className='event-info__date'>
          Event day - {currentEvent && format(new Date(currentEvent.start), 'dd.MM')}
        </p>
        <p className='event-info__duration'>
          Event duration - {currentEvent && format(new Date(currentEvent.start), 'HH:mm')} - {currentEvent && format(new Date(currentEvent.end), 'HH:mm')}
        </p>
        {currentEvent && classes.includes(currentEvent.title) && (
          <div className='event-info__price'>
            <p className='event-info__price-title'>Price</p>
            <p className='event-info__price-title'>Choose your class option:</p>
            <div className='event-info__class-count'>
              <p className={classNames('event-info__class-option', {
                'event-info__class-option--selected': selectedPrice === 'groupClass'
              })}
              onClick={() => setSelectedPrice('groupClass')}
              >
                Group class - {prices.groupClass}EUR
              </p>
              <p className={classNames('event-info__class-option', {
                'event-info__class-option--selected': selectedPrice === 'privateClass'
              })}
              onClick={() => setSelectedPrice('privateClass')}
              >
                Private class - {prices.privateClass}EUR
              </p>
              <p className={classNames('event-info__class-option', {
                'event-info__class-option--selected': selectedPrice === 'privateForTwo'
              })}
              onClick={() => setSelectedPrice('privateForTwo')}
              >
                Group class - {prices.privateForTwo}EUR
              </p>
            </div>
          </div>
        )}
        {currentEvent && someShows.includes(currentEvent.title) ? (
          <div className='event-info__description'>
            {currentShows[currentShows.findIndex(show => show.showName === currentEvent.title)].showTitle}
          </div>
        ) : (
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
        )}
        {currentEvent && classes.includes(currentEvent?.title) && (
          <div className='event-info__pay-option'>
            <button 
              type='button' 
              className={classNames('event-info__pay', {
                'event-info__pay--selected': paymentType === 'Cash'
              })}
              onClick={() => setPaymentType('Cash')}
            >
              Cash
            </button>
            <button 
              type='button' 
              className={classNames('event-info__pay', {
                'event-info__pay--selected': paymentType === 'Card'
              })}
              onClick={() => setPaymentType('Card')}
            >
              Card
            </button>
          </div>
        )}

        {currentEvent && someShows.includes(currentEvent?.title) && (
          <button onClick={cancelShowBooking} className='event-info__button' type='button'>Cancel show booking</button>
        )}
        {currentEvent && classes.includes(currentEvent?.title) && (
          alreadyBooked ? (
            <button onClick={cancelBooking} className='event-info__button' type='button'>Cancel booking</button>
          ) : (
            <button onClick={bookClassPlace} className='event-info__button' type='button' disabled={isPastEvent}>Sign for a course</button>
          )
        )}
      </div>
    </div>
  );
}