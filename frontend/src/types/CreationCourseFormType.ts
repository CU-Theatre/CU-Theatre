import { CourseEvent } from "./CourseEvent";
import { RoadmapItem } from "./Rodmap";

export type CreationCourseFormType = {
  courseName: string;
  courseDuration: string;
  courseImg: string;
  courseIcon: string;
  courseLink: string;
  coursePrice: string;
  courseRoadmap: RoadmapItem[];
  courseBackground: string;
  courseDescr: string;
  courseTime: CourseEvent[];
};