import { CourseEvent } from "./CourseEvent";
import { RoadmapItem } from "./RoadmapItem";

export interface CourseType {
  name: string;
  startDate: string;
  finishDate: string;
  icon: string;
  price: number;
  image: string;
  roadmap: RoadmapItem[];
  description: string;
  courseTime: CourseEvent[];
}
