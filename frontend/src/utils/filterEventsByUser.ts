import { Events, Guest, MainEvents, OtherClasses } from "../types/Events";

interface UserState {
  name: string;
  surname: string;
}

export const filterEventsByUser = (events: Events, userState: UserState): Events => {
  const filterGuests = (guests: Guest[]) => {
    return guests.filter(guest => 
      guest.guestName === userState.name && guest.guestSurname === userState.surname
    );
  };

  // Фільтруємо події для основних подій (mainEvents)
  const filteredMainEvents: MainEvents = {
    impro: filterGuests(events.mainEvents.impro),
    playback: filterGuests(events.mainEvents.playback),
    livePerf: filterGuests(events.mainEvents.livePerf),
  };

  // Фільтруємо події для класів (otherClasses)
  const filteredOtherClasses: OtherClasses = {
    heels: filterGuests(events.otherClasses.heels),
    twerk: filterGuests(events.otherClasses.twerk),
    exotic: filterGuests(events.otherClasses.exotic),
    poleDance: filterGuests(events.otherClasses.poleDance),
    stretching: filterGuests(events.otherClasses.stretching),
  };

  // Повертаємо новий об'єкт events з відфільтрованими подіями
  return {
    mainEvents: filteredMainEvents,
    otherClasses: filteredOtherClasses,
  };
};