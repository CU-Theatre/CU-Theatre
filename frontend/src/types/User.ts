import { CourseType } from "./CourseType";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dramaCourseFinisher: boolean;
  currentCourse: CourseType[];
  emergencyContactDto?: {
    id: number | null,
    userId: number | null,
    firstName: string | null,
    lastName: string | null,
    relation: string | null,
    phoneNumber: string | null,
}
  role: "admin" | "customer";
}
