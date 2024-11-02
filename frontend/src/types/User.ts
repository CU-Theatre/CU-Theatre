export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dramaCourseFinished: boolean;
  currentCourses: number[];
  emergencyContactDto?: {
    id: number | null,
    userId: number | null,
    firstName: string | null,
    lastName: string | null,
    relation: string | null,
    phoneNumber: string | null,
}
  roleName: "admin" | "customer";
}
