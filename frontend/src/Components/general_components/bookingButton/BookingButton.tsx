import React, { useEffect, useState } from "react";
import "./BookingButton.scss";
import { ShowType } from "../../../types/ShowType";
import { useAppContext } from "../../../AppContext";
import { Guest } from "../../../types/Events";
import classNames from "classnames";

interface Props {
  title: string;
  show?: ShowType;
}

export const BookingButton: React.FC<Props> = ({ title, show }) => {
  const { userState, setCourses, eventList, setEventList } = useAppContext();
  const [isGuestExists, setIsGuestExists] = useState(false);
  const [noTickets, setNoTickets] = useState(false);

  useEffect(() => {
    if (!show || !eventList || !eventList.mainEvents) return;

    let currentEventList: Guest[] = [];

    switch (show?.showName) {
      case 'Live performance':
        currentEventList = eventList.mainEvents.livePerf;
        break;
      case 'Impro shows':
        currentEventList = eventList.mainEvents.impro;
        break;
      case 'Playback shows':
        currentEventList = eventList.mainEvents.playback;
        break;
      default:
        console.log('No matching events');
        return;
    }

    if (currentEventList.length === 30) {
      setNoTickets(true)

      return
    }

    setNoTickets(false);

    const guestExists = currentEventList.some(
      (guest) => guest.phone === userState?.phoneNumber
    );
    setIsGuestExists(guestExists);
  }, [show, userState, eventList]);


  const bookShowPlace = (selectedShow: ShowType | undefined) => {
    if (!selectedShow || !userState || isGuestExists || !eventList?.mainEvents) return;

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

    const newShowGuest: Guest = {
      id: eventList.mainEvents[selectedShow.showName as keyof typeof eventList.mainEvents]?.length + 1,
      dayOfWeek: selectedShow.showDate.split('-')[1],
      date: showDateString,
      guestName: userState.firstName,
      guestSurname: userState.lastName,
      phone: userState.phoneNumber,
    };

    let updatedEventList = { ...eventList };
    switch (selectedShow.showName) {
      case 'Live performance':
        updatedEventList.mainEvents.livePerf = [
          ...eventList.mainEvents.livePerf,
          newShowGuest,
        ];
        break;
      case 'Impro shows':
        updatedEventList.mainEvents.impro = [
          ...eventList.mainEvents.impro,
          newShowGuest,
        ];
        break;
      case 'Playback shows':
        updatedEventList.mainEvents.playback = [
          ...eventList.mainEvents.playback,
          newShowGuest,
        ];
        break;
      default:
        return;
    }

    setEventList(updatedEventList);
    setIsGuestExists(true);
    setCourses((prevCourses) => [...prevCourses, newCalendarShow]);

    console.log("Гостя успішно додано:", newShowGuest);
  };

  const cancelShowBooking = (selectedShow: ShowType | undefined) => {
    if (!selectedShow || !userState || !isGuestExists || !eventList?.mainEvents) return;

    const showDateString = selectedShow.showDate.split('-')[0];
    const [day, month] = showDateString.split('.').map(Number);

    let updatedEventList = { ...eventList };

    switch (selectedShow.showName) {
      case 'Live performance':
        updatedEventList.mainEvents.livePerf = eventList.mainEvents.livePerf.filter(
          (guest: Guest) => guest.phone !== userState.phoneNumber
        );
        break;
      case 'Impro shows':
        updatedEventList.mainEvents.impro = eventList.mainEvents.impro.filter(
          (guest: Guest) => guest.phone !== userState.phoneNumber
        );
        break;
      case 'Playback shows':
        updatedEventList.mainEvents.playback = eventList.mainEvents.playback.filter(
          (guest: Guest) => guest.phone !== userState.phoneNumber
        );
        break;
      default:
        return;
    }

    setEventList(updatedEventList);
    setIsGuestExists(false);
    setCourses((prevCourses) =>
      prevCourses.filter(
        (course) =>
          course.title !== selectedShow.showName ||
          course.start.toString() !==
            new Date(2024, month - 1, day, 17, 0).toString()
      )
    );

    console.log("Бронювання скасовано:", userState.phoneNumber);
  };

  return (
    isGuestExists ? (
      <button  
        type="button" 
        className="booking-button" 
        onClick={() => cancelShowBooking(show)}>
        Cancel booking
      </button>
    ) : (
      <button
        type="button" 
        className={classNames("booking-button", {"booking-button--disabled": noTickets})}
        onClick={() => bookShowPlace(show)}
        disabled={noTickets}
      >
        {title}
      </button>
    )
  );
};
