export type GroupedLesson = {
  title: string;
  description?: string;
  icon?: string;
  dates: { date: Date; lessonId: number }[];
};
