import { CourseEvent } from "../types/CourseEvent";
import { GroupedLesson } from "../types/GroupedLesson";

const baseGroupedTraining = {
  title: "",
  description: "",
  icon: "",
  dates: [],
};

export const groupTrainings = (allTrainings: CourseEvent[]) => {
  const groupedTraining: { [a: string]: GroupedLesson } = {};

  allTrainings.forEach((training) => {
    const { title, description, icon, start, id } = training;

    groupedTraining[title] = groupedTraining[title] || baseGroupedTraining;

    const currentDates = groupedTraining[title].dates;

    groupedTraining[title] = {
      title,
      description,
      icon,
      dates: [
        ...currentDates,
        { date: start, lessonId: id || 0 },
      ],
    };
    // TODO delete " || 0" ↑ when id will be in every lesson
  });

  return Object.values(groupedTraining)
};