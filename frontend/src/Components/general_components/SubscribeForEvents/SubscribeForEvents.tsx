import React, { useEffect, useState } from "react";
import { allShows, improShow, liveShow, playbackShow } from "../../../utils/allShows";
import './SubscribeForEvents.scss';
import { ShowType } from "../../../types/ShowType";
import classNames from "classnames";
import { useAppContext } from "../../../AppContext";
import { Guest } from "../../../types/Events";

const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key: string) => {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : null;
};

export const SubscribeForEvents: React.FC = () => {
  const [selectedShow, setSelectedShow] = useState<ShowType | undefined>();
  const { userState, setCourses, eventList, setEventList } = useAppContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ticketCount, setTicketCount] = useState<Record<string, number>>(() => {
    return getFromLocalStorage('ticketCount') || {};
  });

  const detectShow = (someShowName: string) => {
    if (!eventList?.mainEvents) return;

    let chosedShow;

    switch (someShowName) {
      case 'Live performance':
        chosedShow = eventList.mainEvents.livePerf;
        break;
      case 'Impro shows':
        chosedShow = eventList.mainEvents.impro;
        break;
      default:
        chosedShow = eventList.mainEvents.playback;
        break;
    }

    return chosedShow;
  };

  const countTicketsLeft = (someShowName: string) => {
    const lookingShow = detectShow(someShowName);

    if (!lookingShow) return;

    return 30 - lookingShow?.length;
  }

  useEffect(() => {
    saveToLocalStorage('ticketCount', ticketCount);
  }, [ticketCount]);


  const toggleSelectShow = (show: ShowType) => {
    if (selectedShow === show) {
      setSelectedShow(undefined);
    } else {
      setSelectedShow(show);
    }
  }

  const bookShowPlace = (selectedShow: ShowType | undefined) => {
    if (!selectedShow || !userState || !eventList?.mainEvents) return;

    const ticketNumber = ticketCount[selectedShow.showName] || 1;
    const showDateString = selectedShow.showDate.split('-')[0];
    const [day, month] = showDateString.split('.').map(Number);
    const showYear = 2024;
    const showStartTime = new Date(showYear, month - 1, day, 17, 0);
    const showEndTime = new Date(showYear, month - 1, day, 18, 0);

    const newCalendarShow = {
      title: selectedShow.showName,
      start: showStartTime,
      end: showEndTime,
    };

    let currentShow;

    switch (selectedShow.showName) {
      case 'Live performance':
        currentShow = eventList.mainEvents.livePerf;
        break;
      case 'Impro shows':
        currentShow = eventList.mainEvents.impro;
        break;
      default:
        currentShow = eventList.mainEvents.playback;
        break;
    }

    const availableTickets = 30 - currentShow.length;
    if (ticketNumber > availableTickets) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [selectedShow.showName]: "There is not enough tickets",
      }));
      return;
    }

    const mainShowGuests: Guest = {
      id: currentShow.length + 1,
      dayOfWeek: selectedShow.showDate.split('-')[1],
      date: showDateString,
      guestName: userState.firstName,
      guestSurname: userState.lastName,
      phone: userState.phoneNumber,
    };
    

    const additionalGuests: Guest[] = ticketNumber > 1
    ? Array.from({ length: ticketNumber - 1 }, (_, idx) => ({
        id: currentShow.length + 2 + idx,
        dayOfWeek: selectedShow.showDate.split('-')[1],
        date: showDateString,
        guestName: `${userState.firstName} ${userState.lastName}  friend ${idx + 1}`,
        phone: `${userState.phoneNumber} - ${idx}`,
      }))
    : [];

    const newShowGuest = [mainShowGuests, ...additionalGuests];

    let updatedEventList = { ...eventList };
    switch (selectedShow.showName) {
      case 'Live performance':
        updatedEventList.mainEvents.livePerf = [
          ...eventList.mainEvents.livePerf,
          ...newShowGuest,
        ];
        break;
      case 'Impro shows':
        updatedEventList.mainEvents.impro = [
          ...eventList.mainEvents.impro,
          ...newShowGuest,
        ];
        break;
      case 'Playback shows':
        updatedEventList.mainEvents.playback = [
          ...eventList.mainEvents.playback,
          ...newShowGuest,
        ];
        break;
      default:
        return;
    }

    setEventList(updatedEventList);
    console.log(updatedEventList);
    setErrors({});
    setCourses((prevCourses) => [...prevCourses, newCalendarShow]);
    setTicketCount((prevCounts) => {
      if (prevCounts[selectedShow.showName] > 0) {
        return {
          ...prevCounts,
          [selectedShow.showName]: 0,
        };
      }
      return prevCounts;
    });
    console.log("Гостя успішно додано:", newShowGuest);
  };

  const deleteTicket = (guestIndex: number, show: ShowType) => {
    if (!eventList || !userState) return;

    let updatedEventList = { ...eventList };
    
    switch (show.showName) {
      case 'Live performance':
        updatedEventList.mainEvents.livePerf = updatedEventList.mainEvents.livePerf.filter(
          guest => guest.id !== guestIndex
        );
        break;
      case 'Impro shows':
        updatedEventList.mainEvents.impro = updatedEventList.mainEvents.impro.filter(
          guest => guest.id !== guestIndex
        );
        break;
      case 'Playback shows':
        updatedEventList.mainEvents.playback = updatedEventList.mainEvents.playback.filter(
          guest => guest.id !== guestIndex
        );
        break;
      default:
        return;
    }

    setEventList(updatedEventList);
    setTicketCount((prevCounts) => ({
      ...prevCounts,
      [show.showName]: Math.max(0, prevCounts[show.showName] - 1),
    }));
    console.log(guestIndex)
  };

  const increment = (showName: string) => {
    setTicketCount((prevCounts) => ({
      ...prevCounts,
      [showName]: (prevCounts[showName] || 0) + 1,
    }));
  };

  const decrement = (showName: string) => {
    setTicketCount((prevCounts) => ({
      ...prevCounts,
      [showName]: prevCounts[showName] > 0 ? prevCounts[showName] - 1 : 0,
    }));
  };

  return (
    <div className="subscribe-for-event">
      <div className="subscribe-for-event__container">
        <div className="subscribe-for-event__shows">
          <h2 className="subscribe-for-event__title title">Choose your show!</h2>
          <div className="subscribe-for-event__selection">
            {allShows.map(show => (
              <div className='subscribe-for-event__wrapper' key={show.showName}>
                <div 
                  className={classNames("subscribe-for-event__show", {
                    "subscribe-for-event__show--selected": selectedShow === show
                  })}
                  onClick={() => toggleSelectShow(show)} 
                >
                  <p className="subscribe-for-event__showname">Show: {show.showName}</p>
                  <p className="subscribe-for-event__showdate">Show date: {show.showDate}</p>
                  <p className="subscribe-for-event__showprice">Show price: {show.showPrice}</p>
                  <p className="subscribe-for-event__showprice">Total: {parseInt(show.showPrice) * (ticketCount[show.showName] || 0)}$</p>
                  <p className="subscribe-for-event__left">Ticket`s left: {countTicketsLeft(show.showName)}</p>
                  {errors[show.showName] && (
                    <p className="subscribe-for-event__error">{errors[show.showName]}</p>
                  )}
                </div>
                <div className="subscribe-for-event__tickets" onClick={() => setSelectedShow(show)}>
                    <button 
                      type="button" 
                      className="subscribe-for-event__changing-count"
                      onClick={() => decrement(show.showName)}
                      >-</button>
                    <p className="subscribe-for-event__tickets">Tickets count: {ticketCount[show.showName] || 0}</p>
                    <button 
                      type="button" 
                      className="subscribe-for-event__changing-count"
                      onClick={() => increment(show.showName)}
                      >+</button>
                </div>
              </div>
            ))}
          </div>
          <button 
            type="submit" 
            className={classNames('subscribe-for-event__button', {'subscribe-for-event__button--disabled': !selectedShow})}
            onClick={() => bookShowPlace(selectedShow)}
          >
            Book a place
          </button>
        </div>
        <div className="subscribe-for-event__current-tickets">
          <div className="subscribe-for-event__current-group">
            <h4 className="subscribe-for-event__current-title">Impro shows</h4>
            {eventList?.mainEvents.impro.map(user => 
            <div className="subscribe-for-event__current-ticket" key={user.id}>
              <p>Your ticket: {user.guestName} {user.guestSurname && user.guestSurname} {user.date} {user.dayOfWeek}</p>
              <button type="button" className="subscribe-for-event__delete" onClick={() => deleteTicket(user.id, improShow)}>X</button>
            </div>
            )}

          </div>
          <div className="subscribe-for-event__current-group">
            <h4 className="subscribe-for-event__current-title">Playback shows</h4>
            {eventList?.mainEvents.playback.map(user => 
            <div className="subscribe-for-event__current-ticket" key={user.id}>
              <p>Your ticket: {user.guestName} {user.guestSurname && user.guestSurname} {user.date} {user.dayOfWeek}</p>
              <button type="button" className="subscribe-for-event__delete" onClick={() => deleteTicket(user.id, playbackShow)}>X</button>
            </div>
            )}
          </div>
          <div className="subscribe-for-event__current-group">
            <h4 className="subscribe-for-event__current-title">Live performance</h4>
            {eventList?.mainEvents.livePerf.map(user => 
            <div className="subscribe-for-event__current-ticket" key={user.id}>
              <p>Your ticket: {user.guestName} {user.guestSurname && user.guestSurname} {user.date} {user.dayOfWeek}</p>
              <button type="button" className="subscribe-for-event__delete" onClick={() => deleteTicket(user.id, liveShow)}>X</button>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};