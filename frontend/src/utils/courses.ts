import DramaImg from "../Components/img/courses/drama-icon.svg";
import ImproImg from "../Components/img/courses/impro-icon.svg";
import PlaybackImg from "../Components/img/courses/playback-icon.svg";
import { CourseType } from "../types/CourseType";
import DramaBG from "../Components/img/courses/DramaBG.png";
import ImproBG from "../Components/img/courses/ImproBG.png";
import PlaybackBG from "../Components/img/courses/PlaybackBG.png";

export const dramaCourse: CourseType = {
  id: 1,
  status: "IN_PROGRESS",
  name: "Drama course",
  startDate: "2024-09-08T17:57:31",
  finishDate: "2024-10-08T17:52:08",
  icon: DramaImg,
  image: DramaBG,
  price: 45,
  maxPeople: 15,
  // subscribed: [{ name: 'Jone', phoneNumber: '+12345678' }],
  roadmap: [
    {
      id: 1,
      title: "Getting Acquainted and Building Awareness",
      text: "Get used to your classmates. Improve your reaction and attentiveness. Try an exercise that each professional actor does.",
      mainTitle: "Week 1",
    },
    {
      id: 2,
      title: "Voice Work and Vocal Confidence",
      text: "Start working with your voice to sound like a Hollywood star.",
      mainTitle: "Week 2",
    },
    {
      id: 3,
      title: "Introduction to Acting Terminology and Techniques",
      mainTitle: "Week 3",
      text: "Begin learning terminology and become more professional as an actor. Explore concepts like “film vision,” “memory of a physical activity,” and “étude.” Try creating an étude! Practice understanding people without using words.",
    },
    {
      id: 4,
      title: "Improv and Acting Methods Exploration",
      mainTitle: "Week 4",
      text: "Improvise! Try laughing with your partners while playing improv games.",
    },
    {
      id: 5,
      title: "Body Movement and Public Speaking",
      mainTitle: "Week 5",
      text: "Work on body movement and plasticity.",
    },
    {
      id: 6,
      title: "Voice Development and Character Exploration",
      mainTitle: "Week 6",
      text: "Concentrate on your voice and observe the first results.",
    },
    {
      id: 7,
      title: "Skill Refinement and Challenges",
      mainTitle: "Week 7",
      text: "Sharpen all your new skills, including dance improvisation, plasticity, and voice.",
    },
    {
      id: 8,
      title: "Silent Acting and Physical Theatre",
      mainTitle: "Week 8-9",
      text: "Experience silence—no words needed. Try a physical theatre workshop.",
    },
    {
      id: 10,
      title: "Etude Preparation and Exam Readiness",
      mainTitle: "Week 10",
      text: "Dive into études as you prepare for your exam.",
    },
    {
      id: 11,
      title: "Rehearsal and Final Preparations",
      mainTitle: "Week 11",
      text: "Rehearse! Play improv games, warm up your voice, and work on études and short pieces.",
    },
    {
      id: 12,
      title: "Performance and Certification ",
      mainTitle: "Week 11",
      text: "It’s exam time!",
    },
  ],
  description:
    "Discover the world of storytelling and emotion in our Drama course, where you'll master acting techniques, character development, and stage presence, all while building confidence and creativity. Join us and bring your inner performer to life!",
  courseTime: [
    {
      title: "Drama lesson",
      start: new Date(2024, 7, 31, 15, 0),
      end: new Date(2024, 7, 31, 16, 30),
      rule: {
        freq: 'WEEKLY', // Повторення щотижня
        interval: 1, // Кожного тижня
        day: ['SA'], // Вибираємо день тижня (наприклад, п'ятниця)
        start: new Date(Date.UTC(2024, 7, 31, 15, 0, 0)).toString(), // Початок події
        finish: new Date(Date.UTC(2025, 7, 31, 16, 30, 0)).toString(), // Кінець повторення (опціонально)
      },
    },
    {
      title: "Drama lesson",
      start: new Date(2024, 7, 31, 15, 0),
      end: new Date(2024, 7, 31, 16, 30),
      rule: {
        freq: 'WEEKLY', // Повторення щотижня
        interval: 1, // Кожного тижня
        day: ['SA'], // Вибираємо день тижня (наприклад, п'ятниця)
        start: new Date(Date.UTC(2024, 7, 31, 15, 0, 0)).toString(), // Початок події
        finish: new Date(Date.UTC(2025, 7, 31, 16, 30, 0)).toString(), // Кінець повторення (опціонально)
      },
    },
  ],
};

export const improCourse: CourseType = {
  id: 2,
  status: "IN_PROGRESS",
  name: "Impro course",
  startDate: "2024-09-08T17:57:31",
  finishDate: "2024-10-08T17:52:08",
  icon: ImproImg,
  image: ImproBG,
  price: 45,
  maxPeople: 15,
  // subscribed: [{ name: 'Jone', phoneNumber: '+12345678' }],
  roadmap: [
    {
      id: 1,
      mainTitle: "1",
      title: "Team Formation",
      text: "Gather your classmates and form an improv team. Support each other to shine on stage",
    },
    {
      id: 2,
      mainTitle: "2",
      title: "Physical and Vocal Awareness",
      text: "Enhance your stage presence by improving your physical movements and vocal delivery",
    },
    {
      id: 3,
      mainTitle: "3",
      title: "Scenework Mastery",
      text: "Dive into both comedic and dramatic scenes, honing your skills",
    },
    {
      id: 4,
      mainTitle: "4",
      title: "Character and Emotion Exploration",
      text: "Discover how character development and emotional depth can elevate your scenes",
    },
    {
      id: 5,
      mainTitle: "5",
      title: "Creative Voice Development",
      text: "Cultivate your unique creative and comedic style",
    },
    {
      id: 6,
      mainTitle: "6",
      title: "Improv Game Mechanics",
      text: "Understand the mechanics behind different improv games for successful performances",
    },
    {
      id: 7,
      mainTitle: "7",
      title: "Showtime!",
      text: "",
    },
  ],
  description:
    "Join our 8-week improv adventure! We'll gently guide you into the world of live stage performance, where you'll learn to create hilarious scenes and play entertaining short-form games. Get ready to shine alongside your fellow improvisers as you perform in our friendly Improv Comedy Club. It's an exhilarating experience, and we can't wait to welcome you!",
  courseTime: [
    {
      title: "Impro lesson",
      start: new Date(2024, 7, 31, 16, 30),
      end: new Date(2024, 7, 31, 18, 0),
      rule: {
        freq: 'WEEKLY', // Повторення щотижня
        interval: 1, // Кожного тижня
        day: ['SA'], // Вибираємо день тижня (наприклад, п'ятниця)
        start: new Date(Date.UTC(2024, 7, 31, 15, 0, 0)).toString(), // Початок події
        finish: new Date(Date.UTC(2025, 7, 31, 16, 30, 0)).toString(), // Кінець повторення (опціонально)
      },
    },
  ],
};

export const playbackCourse: CourseType = {
  id: 3,
  status: "IN_PROGRESS",
  name: "Playback course",
  startDate: "2024-09-08T17:57:31",
  finishDate: "2024-10-08T17:52:08",
  icon: PlaybackImg,
  image: PlaybackBG,
  price: 45,
  maxPeople: 15,
  // subscribed: [{ name: 'Jone', phoneNumber: '+12345678' }],
  roadmap: [
    {
      id: 1,
      mainTitle: "1",
      title: "Learn 6 forms of playback theater",
    },
    {
      id: 2,
      title: "Develop Emotional Understanding",
      mainTitle: "2",
      text: "Learn to read emotions in others.",
    },
    {
      id: 3,
      title: "Foster Team Spirit and Unity",
      mainTitle: "3",
      text: "Think as a cohesive whole.",
    },
    {
      id: 4,
      title: "Sharpen Quick Reflexes, Flexibility, and Leadership",
      mainTitle: "4",
      text: "Hone your ability to react swiftly.",
    },
    {
      id: 5,
      title: "Enhance Your Acting Craft",
      mainTitle: "5",
      text: "Work on your acting skills.",
    },
    {
      id: 6,
      title: "Listen to Hundreds of Real Life Stories",
      mainTitle: "6",
      text: "Engage with people's narratives.",
    },
    {
      id: 7,
      mainTitle: "7",
      title: "Support Others in Coping with Difficult Emotions",
      text: "Help people navigate challenging feelings.",
    },
    {
      id: 8,
      title: "Showtime!",
      mainTitle: "8",
    },
  ],
  description:
    "8 week Playback Theatre Course: A Transformative Journey Playback is a live show with a healing effect. Audience shares theirs stories, director says a secret word and actors start playing the story focusing on audience's feelings. In this engaging course, you’ll explore six distinct forms of Playback Theatre. From emotional understanding to teamwork, quick reflexes, acting skills, and real-life narratives, you’ll develop valuable abilities. Plus, take the stage with a powerful playback show!",
  courseTime: [
    {
      title: "Impro lesson",
      start: new Date(2024, 7, 31, 13, 30),
      end: new Date(2024, 7, 31, 15, 0),
      rule: {
        freq: 'WEEKLY', // Повторення щотижня
        interval: 1, // Кожного тижня
        day: ['SA'], // Вибираємо день тижня (наприклад, п'ятниця)
        start: new Date(Date.UTC(2024, 7, 31, 15, 0, 0)).toString(), // Початок події
        finish: new Date(Date.UTC(2025, 7, 31, 16, 30, 0)).toString(), // Кінець повторення (опціонально)
      },
    },
  ],
};

export const allCourses = [dramaCourse, improCourse, playbackCourse];
