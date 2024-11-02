export type GroupedLesson = {
  id: number,
  title: string;
  description?: string;
  icon?: string;
  dates: { date: Date; lessonId: number }[];
};
