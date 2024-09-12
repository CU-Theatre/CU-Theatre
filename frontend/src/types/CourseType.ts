import { CourseEvent } from "./CourseEvent";
import { RoadmapItem } from "./Rodmap";

export interface CourseType {
  courseName: string;
  courseDuration: string;
  courseImg: string;
  coursePrice: string;
  courseRoadmap: RoadmapItem[];
  courseBackground: string;
  courseDescr: string;
  courseTime : CourseEvent[];
}
