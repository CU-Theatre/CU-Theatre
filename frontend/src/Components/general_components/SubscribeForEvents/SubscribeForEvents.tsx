import React, { useEffect, useState } from "react";
import { allShows } from "../../../utils/allShows";
import './SubscribeForEvents.scss';
import { ShowType } from "../../../types/ShowType";
import classNames from "classnames";
import { events } from "../../../utils/events";
import { useAppContext } from "../../../AppContext";

export const SubscribeForEvents: React.FC = () => {
  const [selectedShow, setSelectedShow] = useState<ShowType | null>(null);
  const [showAlreadyBooked, setShowAlreadyBooked] = useState(false);
  const { userState, setCourses } = useAppContext();
  const showDateString = selectedShow && selectedShow.showDate.split('-')[0];
  const [day, month] = showDateString ? showDateString.split('.').map(Number) : [];
  const showYear = 2024;
  const showStartTime = new Date(showYear, month - 1, day, 17, 0);
  const showEndTime = new Date(showYear, month - 1, day, 18, 0); 
  const newCalendarShow = {
    title: selectedShow ? selectedShow.showName : '',
    start: showStartTime,
    end: showEndTime,
  };

  const toggleSelectShow = (show: ShowType) => {
    if (selectedShow === show) {
      setSelectedShow(null);
    } else {
      setSelectedShow(show);
    }
  }

  const bookShowPlace = () => {
    if (selectedShow && userState) {
      const newShowGuest = {
        id: 0,
        dayOfWeek: selectedShow.showDate.split('-')[1],
        date: selectedShow.showDate.split('-')[0],
        guestName: userState?.firstName,
        guestSurname: userState.lastName,
        phone: userState?.phoneNumber,
      };
  
      let eventList;
  
      switch (selectedShow?.showName) {
        case 'Live performance':
          eventList = events.mainEvents.livePerf;
          break;
  
        case 'Impro shows':
          eventList = events.mainEvents.impro;
          break;
  
        case 'Playback shows':
          eventList = events.mainEvents.playback;
          break;

        default:
          console.log('no matching events');
          break
      }

      if (!eventList) {
        console.log("Event list is undefined, please check selectedShow.showName");
        return;
      }
  
      const isGuestExists = eventList.some(guest => guest.phone === newShowGuest.phone);
  
      if (!isGuestExists) {
        newShowGuest.id = eventList.length + 1;
        eventList.push(newShowGuest);
        setSelectedShow(null);
        setCourses((prevCourses) => [...prevCourses, newCalendarShow])
        console.log("Гостя успішно додано:");
      } else {
        setShowAlreadyBooked(true);
        console.log("Гість з таким номером телефону вже існує:", newShowGuest.phone);
      }
    }
  };

  const cancelShowBooking = () => {
    if (selectedShow && userState) {
  
      let currentShow;
  
      switch (selectedShow.showName) {
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
        (guest) => guest.phone === userState.phoneNumber && guest.date === showDateString
      );
  
      if (guestIndex !== -1) {
        currentShow.splice(guestIndex, 1);
        setCourses((prevEvents) => [...prevEvents]
          .filter(someEvent => someEvent.title !== newCalendarShow.title && someEvent.start !== newCalendarShow.start))
        console.log("Бронювання скасовано для:", userState.phoneNumber);
      } else {
        console.log("Бронювання не знайдено для цього користувача:", userState.phoneNumber);
      }
  
      setSelectedShow(null);
    }
  };

  useEffect(() => {
    let eventList;
  
    switch (selectedShow?.showName) {
      case "Live performance":
        eventList = events.mainEvents.livePerf;
        break;

      case "Impro shows":
        eventList = events.mainEvents.impro;
        break;

      default:
        eventList = events.mainEvents.playback;
        break;
    }

    const isGuestExists = eventList.some(guest => guest.phone === userState?.phoneNumber);
  
      setShowAlreadyBooked(isGuestExists);
  }, [selectedShow?.showName, userState?.phoneNumber])

  return (
    <div className="subscribe-for-event">
      <div className="subscribe-for-event__container">
        <div className="subscribe-for-event__shows">
          <h2 className="subscribe-for-event__title title">Choose your show!</h2>
          <div className="subscribe-for-event__selection">
            {allShows.map(show => (
              <div 
                className={classNames("subscribe-for-event__show", {
                  "subscribe-for-event__show--selected": selectedShow === show
                })}
                onClick={() => toggleSelectShow(show)} 
                key={show.showName}
              >
                <p className="subscribe-for-event__showname">Show: {show.showName}</p>
                <p className="subscribe-for-event__showdate">Show date: {show.showDate}</p>
                <p className="subscribe-for-event__showprice">Show price: {show.showPrice}</p>
              </div>
            ))}
          </div>
          {showAlreadyBooked && selectedShow !== null ? (
            <button 
              type="submit" 
              className="subscribe-for-event__button"
              onClick={cancelShowBooking}
            >
              Cancel Booking
            </button>
          ) : (
            <button 
            type="submit" 
            className="subscribe-for-event__button"
            onClick={bookShowPlace}
          >
            Book a place
          </button>
          )}
        </div>
      </div>
    </div>
  );
};