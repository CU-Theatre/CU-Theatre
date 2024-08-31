import { Frequency, Weekday } from "rrule";

export interface DropdownTypes {
  title: string;
  freqOption: Weekday | Frequency ;
};