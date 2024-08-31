import { RRule } from "rrule";
import { DropdownTypes } from "../types/DropdownTypes";



export const frequency: DropdownTypes[] = [
  {
    title: 'Every day',
    freqOption:  RRule.DAILY,
  },
  {
    title: 'Every week',
    freqOption: RRule.WEEKLY,
  },
  {
    title: 'Every month',
    freqOption: RRule.MONTHLY,
  },
];

export const weekDays: DropdownTypes[] = [
  {
    title: 'Monday',
    freqOption: RRule.MO,
  },
  {
    title: 'Tuesday',
    freqOption: RRule.TU,
  },
  {
    title: 'Wednesday',
    freqOption: RRule.WE,
  },
  {
    title: 'Thursday',
    freqOption: RRule.TH,
  },
  {
    title: 'Friday',
    freqOption: RRule.FR,
  },
  {
    title: 'Saturday',
    freqOption: RRule.SA,
  },
  {
    title: 'Sunday',
    freqOption: RRule.SU,
  },
];