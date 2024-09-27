import { CourseEvent } from "../types/CourseEvent";
import { EventRule } from "../types/EventRule";
import { groupedDate } from "./groupedDate";

export const createEvent = (
  eventRule: EventRule,
  title: string,
  startDate: string,
  finishDate: string,
  description?: string,
  icon?: string,
  id?: number
): CourseEvent => {
  const { start, end, freq, interval, day } = eventRule;

  const groupedStartData = groupedDate(startDate, start);
  const groupedEndData = groupedDate(startDate, end);
  const groupedFinishData =groupedDate(finishDate, end);
  return {
    title,
    start: new Date(groupedStartData),
    end: new Date(groupedEndData),
    description,
    id,
    icon,
    rule: {
      day,
      freq,
      interval,
      start: groupedStartData,
      finish: groupedFinishData,
    },
  };
};
