import { RRule } from "rrule";
import { CourseEvent } from "../types/CourseEvent";

export const allClasses: CourseEvent[] = [ 
  {
    id: 0,
    title: 'Heels',
    start: new Date(2024, 8, 15, 16, 30),
    end: new Date(2024, 8, 15, 17, 30),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.SU],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 8, 15, 16, 30, 0)), // Початок події
      until: new Date(Date.UTC(2025, 8, 15, 17, 30, 0)),   // Кінець повторення (опціонально)
    }),
  },
  {
    id: 1,
    title: 'Heels',
    start: new Date(2024, 8, 18, 14, 15),
    end: new Date(2024, 8, 18, 15, 15),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.WE],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 8, 18, 14, 0, 0)), // Початок події
      until: new Date(Date.UTC(2025, 8, 18, 15, 0, 0)),   // Кінець повторення (опціонально)
    }),
  },
  {
    id: 2,
    title: 'Pole Dance',
    start: new Date(2024, 8, 15, 17, 30),
    end: new Date(2024, 8, 15, 18, 30),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.SU],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 15, 17, 30, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 15, 18, 30, 0)),   // Кінець повторення (опціонально)
    }),
  },
  {
    id: 3,
    title: 'Twerk',
    start: new Date(2024, 8, 18, 13, 15),
    end: new Date(2024, 8, 18, 14, 15),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.WE],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 18, 13, 15, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 18, 14, 15, 0)),   // Кінець повторення (опціонально)
    }),
  },
  {
    id: 4,
    title: 'Stretching',
    start: new Date(2024, 8, 16, 15, 0),
    end: new Date(2024, 8, 16, 16, 0),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.MO],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 8, 16, 15, 0, 0)), // Початок події
      until: new Date(Date.UTC(2025, 8, 16, 16, 0, 0)),   // Кінець повторення (опціонально)
    }),
  },
  {
    id: 5,
    title: 'Stretching',
    start: new Date(2024, 8, 19, 16, 0),
    end: new Date(2024, 8, 19, 17, 0),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.TH],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 19, 16, 0, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 19, 17, 0, 0)),   // Кінець повторення (опціонально)
    }),
  },
  {
    id: 6,
    title: 'Stretching',
    start: new Date(2024, 8, 20, 10, 30),
    end: new Date(2024, 8, 20, 11, 30),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.FR],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 8, 20, 10, 30, 0)), // Початок події
      until: new Date(Date.UTC(2025, 8, 20, 11, 30, 0)),   // Кінець повторення (опціонально)
    }),
  },
  {
    id: 7,
    title: 'Stretching',
    start: new Date(2024, 8, 21, 11, 30),
    end: new Date(2024, 8, 21, 12, 30),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.SA],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 21, 11, 30, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 21, 12, 30, 0)),   // Кінець повторення (опціонально)
    }),
  },
  {
    id: 8,
    title: 'Exotic',
    start: new Date(2024, 8, 21, 16, 0),
    end: new Date(2024, 8, 21, 17, 0),
    rrule: new RRule({
      freq: RRule.WEEKLY,  // Повторення щотижня
      interval: 1,         // Кожного тижня
      byweekday: [RRule.SA],  // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 8, 21, 16, 0, 0)), // Початок події
      until: new Date(Date.UTC(2025, 8, 21, 17, 0, 0)),   // Кінець повторення (опціонально)
    }),
  },
];