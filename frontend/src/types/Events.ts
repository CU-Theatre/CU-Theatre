export interface Guest {
  id: number;
  dayOfWeek: string;
  date: string;
  guestName: string;
  guestSurname?: string;
  phone?: string;
}

export interface MainEvents {
  impro: Guest[];
  playback: Guest[];
  livePerf: Guest[];
}

export interface OtherClasses {
  heels: Guest[];
  twerk: Guest[];
  exotic: Guest[];
  poleDance: Guest[];
  stretching: Guest[];
}

export interface Events {
  mainEvents: MainEvents;
  otherClasses: OtherClasses;
}