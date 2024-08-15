export interface Course {
  courseName: string;
  courseDuration: string;
  courseImg: string;
  courseDescr: string;
}

export interface User {
  name: string;
  surname: string;
  email: string;
  dramaCourseFinisher: boolean;
  currentCourse: Course[];
}