import React, { useState } from "react";
import { allShows } from "../../../utils/allShows";
import './SubscribeForEvents.scss';
import { ShowType } from "../../../types/ShowType";
import classNames from "classnames";
import { events } from "../../../utils/events";
import { useAppContext } from "../../../AppContext";

export const SubscribeForEvents: React.FC = () => {
  const [selectedShow, setSelectedShow] = useState<ShowType | null>(null);
  const { userState } = useAppContext();

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
  
      const isGuestExists = eventList.some(guest => guest.phone === newShowGuest.phone);
  
      if (!isGuestExists) {
        newShowGuest.id = eventList.length + 1;
        eventList.push(newShowGuest);
        console.log("Гостя успішно додано:", newShowGuest);
      } else {
        console.log("Гість з таким номером телефону вже існує:", newShowGuest.phone);
      }
    }
  };

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
          <button 
            type="submit" 
            className="subscribe-for-event__button"
            onClick={bookShowPlace}
          >
            Book a place
          </button>
        </div>
      </div>
    </div>
  );
};