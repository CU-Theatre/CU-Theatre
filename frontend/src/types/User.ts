import { CourseType } from "./CourseType";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dramaCourseFinisher: boolean;
  currentCourse: CourseType[];
}