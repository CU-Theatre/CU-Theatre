import { User } from "../types/User";
import { dramaCourse} from "./courses";

export const user: User = {
  name: "Ihor",
  surname: "Prodan",
  email: "ihorprodan@gmail.com",
  dramaCourseFinisher: false,
  currentCourse: [dramaCourse],
};
