export type EventRule = {
  day: ["MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU" | "-1"];
  start: string;
  end: string;
  finish: string;
  freq:
    | "YEARLY"
    | "MONTHLY"
    | "WEEKLY"
    | "DAILY"
    | "HOURLY"
    | "MINUTELY"
    | "SECONDLY";
  interval: number;
};
