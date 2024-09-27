import { Rule } from "./Rule";

export interface CourseEvent {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  id?: number;
  icon?: string;
  rule?: Rule;
}