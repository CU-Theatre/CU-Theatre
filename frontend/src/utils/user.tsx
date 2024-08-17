import { User } from "../types/User";
import Dramaimg from '../Components/img/AccountImg/DramaIcon.svg';

export const user: User = {
  name: 'Ihor',
  surname: 'Prodan',
  email: 'ihorprodan@gmail.com',
  dramaCourseFinisher: false,
  currentCourse: [
    {
      courseName: 'Drama course',
      courseDuration: '21.08 - 12.11',
      courseImg: Dramaimg,
      courseDescr: "Discover the world of storytelling and emotion in our Drama course, where you'll master acting techniques, character development, and stage presence, all while building confidence and creativity. Join us and bring your inner performer to life!",
    }
  ],
}