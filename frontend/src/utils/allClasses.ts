import { RRule } from "rrule";
import { CourseEvent } from "../types/CourseEvent";

export const allClasses: CourseEvent[] = [ 
  {
    title: 'Heels',
    start: new Date(2024, 9, 15, 16, 30),
    end: new Date(2024, 9, 15, 17, 30),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.SU],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 15, 16, 30, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 15, 17, 30, 0)),   // Кінець повторення (опціонально)
    }),
  },
  {
    title: 'Heels',
    start: new Date(2024, 9, 18, 14, 15),
    end: new Date(2024, 9, 18, 15, 15),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.WE],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 18, 14, 0, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 18, 15, 0, 0)),   // Кінець повторення (опціонально)
    }),
  },
  {
    title: 'Pole Dance',
    start: new Date(2024, 9, 15, 17, 30),
    end: new Date(2024, 9, 15, 18, 30),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.SU],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 15, 17, 30, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 15, 18, 30, 0)),   // Кінець повторення (опціонально)
    }),
  },
  {
    title: 'Twerk',
    start: new Date(2024, 9, 18, 13, 15),
    end: new Date(2024, 9, 18, 14, 15),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.WE],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 18, 13, 15, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 18, 14, 15, 0)),   // Кінець повторення (опціонально)
    }),
  },
  {
    title: 'Stretching',
    start: new Date(2024, 9, 16, 15, 0),
    end: new Date(2024, 9, 16, 16, 0),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.MO],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 16, 15, 0, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 16, 16, 0, 0)),   // Кінець повторення (опціонально)
    }),
  },
  {
    title: 'Stretching',
    start: new Date(2024, 9, 19, 16, 0),
    end: new Date(2024, 9, 19, 17, 0),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.TH],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 19, 16, 0, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 19, 17, 0, 0)),   // Кінець повторення (опціонально)
    }),
  },
  {
    title: 'Stretching',
    start: new Date(2024, 9, 20, 10, 30),
    end: new Date(2024, 9, 20, 11, 30),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.FR],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 20, 10, 30, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 20, 11, 30, 0)),   // Кінець повторення (опціонально)
    }),
  },
  {
    title: 'Stretching',
    start: new Date(2024, 9, 21, 11, 30),
    end: new Date(2024, 9, 21, 12, 30),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.SA],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 21, 11, 30, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 21, 12, 30, 0)),   // Кінець повторення (опціонально)
    }),
  },
  {
    title: 'Exotic',
    start: new Date(2024, 9, 21, 16, 0),
    end: new Date(2024, 9, 21, 17, 0),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.SA],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 21, 16, 0, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 21, 17, 0, 0)),   // Кінець повторення (опціонально)
    }),
  },
];