import { Rule } from "../types/Rule";
import { RRule, Weekday } from "rrule";

export const createRrule = (rule: Rule) => {
  const { day, freq, interval, start, finish } = rule;

  const byweekday = day
    .map((day) => (day !== "-1" ? RRule[day] : "-1"))
    .filter((day) => day !== "-1") as Weekday[];

  return new RRule({
    freq: RRule[freq],
    interval,
    byweekday,
    dtstart: new Date(start),
    until: new Date(finish),
  });
};
