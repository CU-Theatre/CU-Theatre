import { RoadmapItemCreate } from "./RoadmapItem";

export type CreationCourseFormType = {
  name: string;
  description: string;
  startDate: string;
  finishDate: string;
  icon: string;
  price: number;
  image: string;
  roadmap: Omit<RoadmapItemCreate, 'courseId'>[];
};