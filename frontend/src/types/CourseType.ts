import { CourseEvent } from "./CourseEvent";
import { RoadmapItem } from "./RoadmapItem";

export interface CourseType {
  id: number;
  name: string;
  description: string;
  status: "IN_PROGRESS" | "NOT_STARTED";
  startDate: string;
  image: string;
  icon: string;
  roadmap: RoadmapItem[];
  usersId?: null | number[];
  finishDate: string;
  price: number;
  maxPeople: number;
  courseTime: CourseEvent[];
}
