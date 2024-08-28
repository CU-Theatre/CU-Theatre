import { RoadmapItem } from "./Rodmap";

export interface CourseType {
  courseName: string;
  courseDuration: string;
  courseImg: string;
  courseLink: string;
  courseRoadmap: RoadmapItem[];
  courseBackground: string;
  courseDescr: string;
}
