import DramaImg from "../Components/img/courses/drama-icon.svg";
import ImproImg from "../Components/img/courses/impro-icon.svg";
import PlaybackImg from "../Components/img/courses/playback-icon.svg";
import { CourseType } from "../types/CourseType";

export const dramaCourse: CourseType = {
  courseName: "Drama course",
  courseDuration: "21.08 - 12.11",
  courseImg: DramaImg,
  courseDescr:
    "Discover the world of storytelling and emotion in our Drama course, where you'll master acting techniques, character development, and stage presence, all while building confidence and creativity. Join us and bring your inner performer to life!",
};

export const improCourse: CourseType = {
  courseName: "Impro course",
  courseDuration: "21.08 - 12.11",
  courseImg: ImproImg,
  courseDescr:
    "Join our 8-week improv adventure! We'll gently guide you into the world of live stage performance, where you'll learn to create hilarious scenes and play entertaining short-form games. Get ready to shine alongside your fellow improvisers as you perform in our friendly Improv Comedy Club. It's an exhilarating experience, and we can't wait to welcome you!",
};

export const playbackCourse: CourseType = {
  courseName: "Playback course",
  courseDuration: "21.08 - 12.11",
  courseImg: PlaybackImg,
  courseDescr:
    "8 week Playback Theatre Course: A Transformative Journey Playback is a live show with a healing effect. Audience shares theirs stories, director says a secret word and actors start playing the story focusing on audience's feelings. In this engaging course, you’ll explore six distinct forms of Playback Theatre. From emotional understanding to teamwork, quick reflexes, acting skills, and real-life narratives, you’ll develop valuable abilities. Plus, take the stage with a powerful playback show!",
};

export const allCourses = [dramaCourse, improCourse, playbackCourse];
