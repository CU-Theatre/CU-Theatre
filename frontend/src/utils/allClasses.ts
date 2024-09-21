import { RRule } from "rrule";
import { CourseEvent } from "../types/CourseEvent";
import heelsIcon from "../Components/img/shoe.webp";
import poleDanceIcon from "../Components/img/icons/pole-dance.webp";
import twerkIcon from "../Components/img/icons/twerk.webp";
import stretchingIcon from "../Components/img/icons/stretching.webp";
import exoticcIcon from "../Components/img/icons/exotic.webp";

export const allClasses: CourseEvent[] = [
  {
    id: 0,
    title: "Heels",
    start: new Date(2024, 9, 15, 16, 30),
    end: new Date(2024, 9, 15, 17, 30),
    description: "",
    icon: heelsIcon,
    rrule: new RRule({
      freq: RRule.WEEKLY, // Повторення щотижня
      interval: 1, // Кожного тижня
      byweekday: [RRule.SU], // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 15, 16, 30, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 15, 17, 30, 0)), // Кінець повторення (опціонально)
    }),
  },
  {
    id: 1,
    title: "Heels",
    start: new Date(2024, 9, 18, 14, 15),
    end: new Date(2024, 9, 18, 15, 15),
    description: "",
    icon: heelsIcon,
    rrule: new RRule({
      freq: RRule.WEEKLY, // Повторення щотижня
      interval: 1, // Кожного тижня
      byweekday: [RRule.WE], // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 18, 14, 0, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 18, 15, 0, 0)), // Кінець повторення (опціонально)
    }),
  },
  {
    id: 2,
    title: "Pole Dance",
    start: new Date(2024, 9, 15, 17, 30),
    end: new Date(2024, 9, 15, 18, 30),
    icon: poleDanceIcon,
    description:
      "Pole dance is a fitness and performance art that combines acrobatic movements with strength, flexibility, and dance, using a vertical pole. It builds upper body strength, core stability, and coordination while allowing for creative expression.",
    rrule: new RRule({
      freq: RRule.WEEKLY, // Повторення щотижня
      interval: 1, // Кожного тижня
      byweekday: [RRule.SU], // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 15, 17, 30, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 15, 18, 30, 0)), // Кінець повторення (опціонально)
    }),
  },
  {
    id: 3,
    title: "Twerk",
    icon: twerkIcon,
    start: new Date(2024, 9, 18, 13, 15),
    end: new Date(2024, 9, 18, 14, 15),
    description:
      "Twerk is an energetic dance style focused on rhythmic hip movements and isolation of the lower body. It combines elements of hip-hop and African dance, improving coordination, core strength, and flexibility. Twerk classes are a fun way to build confidence, express yourself, and get a full-body workout.",
    rrule: new RRule({
      freq: RRule.WEEKLY, // Повторення щотижня
      interval: 1, // Кожного тижня
      byweekday: [RRule.WE], // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 18, 13, 15, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 18, 14, 15, 0)), // Кінець повторення (опціонально)
    }),
  },
  {
    id: 4,
    title: "Stretching",
    start: new Date(2024, 9, 16, 15, 0),
    end: new Date(2024, 9, 16, 16, 0),
    icon: stretchingIcon,
    description:
      "Stretching is a flexibility-focused class that helps improve range of motion, posture, and muscle recovery. Through a series of gentle exercises, it targets muscles and joints, promoting relaxation and reducing the risk of injury. Ideal for all fitness levels, stretching enhances mobility and supports overall well-being.",
    rrule: new RRule({
      freq: RRule.WEEKLY, // Повторення щотижня
      interval: 1, // Кожного тижня
      byweekday: [RRule.MO], // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 16, 15, 0, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 16, 16, 0, 0)), // Кінець повторення (опціонально)
    }),
  },
  {
    id: 5,
    title: "Stretching",
    start: new Date(2024, 9, 19, 16, 0),
    end: new Date(2024, 9, 19, 17, 0),
    icon: stretchingIcon,
    description:
      "Stretching is a flexibility-focused class that helps improve range of motion, posture, and muscle recovery. Through a series of gentle exercises, it targets muscles and joints, promoting relaxation and reducing the risk of injury. Ideal for all fitness levels, stretching enhances mobility and supports overall well-being.",
    rrule: new RRule({
      freq: RRule.WEEKLY, // Повторення щотижня
      interval: 1, // Кожного тижня
      byweekday: [RRule.TH], // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 19, 16, 0, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 19, 17, 0, 0)), // Кінець повторення (опціонально)
    }),
  },
  {
    id: 6,
    title: "Stretching",
    start: new Date(2024, 9, 20, 10, 30),
    end: new Date(2024, 9, 20, 11, 30),
    icon: stretchingIcon,
    description:
      "Stretching is a flexibility-focused class that helps improve range of motion, posture, and muscle recovery. Through a series of gentle exercises, it targets muscles and joints, promoting relaxation and reducing the risk of injury. Ideal for all fitness levels, stretching enhances mobility and supports overall well-being.",
    rrule: new RRule({
      freq: RRule.WEEKLY, // Повторення щотижня
      interval: 1, // Кожного тижня
      byweekday: [RRule.FR], // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 20, 10, 30, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 20, 11, 30, 0)), // Кінець повторення (опціонально)
    }),
  },
  {
    id: 7,
    title: "Stretching",
    start: new Date(2024, 9, 21, 11, 30),
    end: new Date(2024, 9, 21, 12, 30),
    icon: stretchingIcon,
    description:
      "Stretching is a flexibility-focused class that helps improve range of motion, posture, and muscle recovery. Through a series of gentle exercises, it targets muscles and joints, promoting relaxation and reducing the risk of injury. Ideal for all fitness levels, stretching enhances mobility and supports overall well-being.",
    rrule: new RRule({
      freq: RRule.WEEKLY, // Повторення щотижня
      interval: 1, // Кожного тижня
      byweekday: [RRule.SA], // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 21, 11, 30, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 21, 12, 30, 0)), // Кінець повторення (опціонально)
    }),
  },
  {
    id: 8,
    title: "Exotic",
    start: new Date(2024, 9, 21, 16, 0),
    end: new Date(2024, 9, 21, 17, 0),
    description: "",
    icon: exoticcIcon,
    rrule: new RRule({
      freq: RRule.WEEKLY, // Повторення щотижня
      interval: 1, // Кожного тижня
      byweekday: [RRule.SA], // Вибираємо день тижня (наприклад, п'ятниця)
      dtstart: new Date(Date.UTC(2023, 9, 21, 16, 0, 0)), // Початок події
      until: new Date(Date.UTC(2025, 9, 21, 17, 0, 0)), // Кінець повторення (опціонально)
    }),
  },
];
