import { RoadmapItem } from "./Rodmap";

export interface CourseType {
  courseName: string;
  courseDuration: string;
  courseImg: string;
  courseLink: string;
  coursePrice: string;
  courseRoadmap: RoadmapItem[];
  courseBackground: string;
  courseDescr: string;
}
