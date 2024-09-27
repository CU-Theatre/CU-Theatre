
export type Rule = {
  day: ["MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU" | "-1"];
  freq:
    | "YEARLY"
    | "MONTHLY"
    | "WEEKLY"
    | "DAILY"
    | "HOURLY"
    | "MINUTELY"
    | "SECONDLY";
  interval: number;
  start: string;
  finish: string;
};
