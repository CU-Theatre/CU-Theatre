import { RRule } from "rrule";

export interface CourseEvent {
  title: string;
  start: Date;
  end: Date;
  rrule?: RRule;
}