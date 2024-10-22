import { User } from "../types/User";

export const user: User = {
  id: 25,
  firstName: "Ihor",
  lastName: "Prodan",
  email: "ihorprodan@gmail.com",
  phoneNumber: '',
  dramaCourseFinished: false,
  currentCourses: [1],
  emergencyContactDto: {
    id: null,
    userId: 3,
    firstName: null,
    lastName: null,
    relation: null,
    phoneNumber: null
},
  roleName: 'admin'
};
