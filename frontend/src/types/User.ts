import { CourseType } from "./CourseType";

export interface User {
  name: string;
  surname: string;
  email: string;
  dramaCourseFinisher: boolean;
  currentCourse: CourseType[];
}