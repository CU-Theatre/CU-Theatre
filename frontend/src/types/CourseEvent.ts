import { RRule } from "rrule";

export interface CourseEvent {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  id?: number;
  icon?: string;
  rrule?: RRule;
}