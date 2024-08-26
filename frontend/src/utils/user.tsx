import { User } from "../types/User";
import { dramaCourse } from "./courses";

export const user: User = {
  firstName: "Ihor",
  lastName: "Prodan",
  email: "ihorprodan@gmail.com",
  phoneNumber: '',
  dramaCourseFinisher: false,
  currentCourse: [dramaCourse],
};
