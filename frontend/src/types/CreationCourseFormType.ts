import { EventRule } from "./EventRule";
import { RoadmapItemCreate } from "./RoadmapItem";

export type CreationCourseFormType = {
  name: string;
  description: string;
  startDate: string;
  finishDate: string;
  icon: string;
  price: number | string;
  image: string;
  roadmap: Omit<RoadmapItemCreate, "courseId">[];
  maxPeople?: number | string;
  classTime: EventRule[];
};
