import { CourseEvent } from "./CourseEvent";
import { RoadmapItem } from "./Rodmap";
import { ServerRoadmapItem } from "./ServerRoadmapItem";

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
