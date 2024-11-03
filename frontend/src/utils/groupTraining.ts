import { ClassesAPI } from "../types/ClassesAPI";
import { GroupedLesson } from "../types/GroupedLesson";

const baseGroupedTraining = {
  title: "",
  description: "",
  icon: "",
  dates: [],
};

export const groupTrainings = (allTrainings: ClassesAPI[]) => {
  const groupedTraining: { [a: string]: GroupedLesson } = {};

  allTrainings.forEach((training) => {
    const { title, description, icon, start, id } = training;

    groupedTraining[title] = groupedTraining[title] || baseGroupedTraining;

    const currentDates = groupedTraining[title].dates;

    groupedTraining[title] = {
      id,
      title,
      description,
      icon,
      dates: [
        ...currentDates,
        { date: new Date(start), lessonId: id || 0 },
      ],
    };
    // TODO delete " || 0" ↑ when id will be in every lesson
  });

  return Object.values(groupedTraining)
};