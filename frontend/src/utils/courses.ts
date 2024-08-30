import DramaImg from "../Components/img/courses/drama-icon.svg";
import ImproImg from "../Components/img/courses/impro-icon.svg";
import PlaybackImg from "../Components/img/courses/playback-icon.svg";
import { CourseType } from "../types/CourseType";
import DramaBG from '../Components/img/courses/DramaBG.png';
import ImproBG from '../Components/img/courses/ImproBG.png';
import PlaybackBG from '../Components/img/courses/PlaybackBG.png';

export const dramaCourse: CourseType = {
  courseName: "Drama course",
  courseDuration: "21.08 - 12.11",
  courseImg: DramaImg,
  courseBackground: DramaBG,
  courseLink: 'drama-course',
  coursePrice: '45$',
  courseRoadmap: [
    {
      roadmapId: 1,
      roadmapTitle: 'Getting Acquainted and Building Awareness',
      listStyle: true,
      roadmapText: [
        'Get used to your classmates.',
        'Improve your reaction and attentiveness.',
        'Try an exercise that each professional actor does.',
      ],
    },
    {
      roadmapId: 2,
      roadmapTitle: 'Voice Work and Vocal Confidence',
      roadmapText: 'Start working with your voice to sound like a Hollywood star.',
    },
    {
      roadmapId: 3,
      roadmapTitle: 'Introduction to Acting Terminology and Techniques',
      listStyle: true,
      roadmapText: [
        'Begin learning terminology and become more professional as an actor.',
        'Explore concepts like “film vision,” “memory of a physical activity,” and “étude.” Try creating an étude!',
        'Practice understanding people without using words.',
      ],
    },
    {
      roadmapId: 4,
      roadmapTitle: 'Improv and Acting Methods Exploration',
      listStyle: true,
      roadmapText: [
        'Improvise! Try laughing with your partners while playing improv games.',
        'Learn about terms like “inner monologue” and “through action”.',
        'Explore different acting methods to find your preference.',
      ],
    },
    {
      roadmapId: 5,
      roadmapTitle: 'Body Movement and Public Speaking',
      listStyle: true,
      roadmapText: [
        'Work on body movement and plasticity.',
        'Enhance your deductive thinking skills.',
        'Focus on your voice and learn about public speaking.',
      ],
    },
    {
      roadmapId: 6,
      roadmapTitle: 'Voice Development and Character Exploration',
      listStyle: true,
      roadmapText: [
        'Concentrate on your voice and observe the first results.',
        'Engage in improv games and explore the core of character development.',
      ],
    },
    {
      roadmapId: 7,
      roadmapTitle: 'Skill Refinement and Challenges',
      listStyle: true,
      roadmapText: [
        'Sharpen all your new skills, including dance improvisation, plasticity, and voice.',
        'Challenge yourself with études.',
      ],
    },
    {
      roadmapId: '8-9',
      roadmapTitle: 'Silent Acting and Physical Theatre',
      listStyle: true,
      roadmapText: [
        'Experience silence—no words needed. Try a physical theatre workshop.',
      ],
    },
    {
      roadmapId: 10,
      roadmapTitle: 'Etude Preparation and Exam Readiness',
      listStyle: true,
      roadmapText: [
        'Dive into études as you prepare for your exam.',
      ],
    },
    {
      roadmapId: 11,
      roadmapTitle: 'Rehearsal and Final Preparations',
      listStyle: true,
      roadmapText: [
        'Rehearse! Play improv games, warm up your voice, and work on études and short pieces.',
        'Feel confident—you’re ready to step onto the stage!',
      ],
    },
    {
      roadmapId: 12,
      roadmapTitle: 'Performance and Certification ',
      listStyle: true,
      showtime: true,
      roadmapText: [
        'It’s exam time!',
        'Showcase your études or short pieces in a group or solo performance.',
        'Smile and receive your certificates!',
      ],
    },
  ],
  courseDescr:
    "Discover the world of storytelling and emotion in our Drama course, where you'll master acting techniques, character development, and stage presence, all while building confidence and creativity. Join us and bring your inner performer to life!",
};

export const improCourse: CourseType = {
  courseName: "Impro course",
  courseDuration: "21.08 - 12.11",
  courseImg: ImproImg,
  courseBackground: ImproBG,
  courseLink: 'impro-course',
  coursePrice: '45$',
  courseRoadmap: [
    {
      roadmapId: 1,
      roadmapTitle: 'Team Formation',
      roadmapText: 'Gather your classmates and form an improv team. Support each other to shine on stage',
    },
    {
      roadmapId: 2,
      roadmapTitle: 'Physical and Vocal Awareness',
      roadmapText: 'Enhance your stage presence by improving your physical movements and vocal delivery',
    },
    {
      roadmapId: 3,
      roadmapTitle: 'Scenework Mastery',
      roadmapText: 'Dive into both comedic and dramatic scenes, honing your skills',
    },
    {
      roadmapId: 4,
      roadmapTitle: 'Character and Emotion Exploration',
      roadmapText: 'Discover how character development and emotional depth can elevate your scenes',
    },
    {
      roadmapId: 5,
      roadmapTitle: 'Creative Voice Development',
      roadmapText: 'Cultivate your unique creative and comedic style',
    },
    {
      roadmapId: 6,
      roadmapTitle: 'Improv Game Mechanics',
      roadmapText: 'Understand the mechanics behind different improv games for successful performances',
    },
    {
      roadmapId: 7,
      roadmapTitle: 'Showtime!',
      showtime: true,
    },
  ],
  courseDescr:
    "Join our 8-week improv adventure! We'll gently guide you into the world of live stage performance, where you'll learn to create hilarious scenes and play entertaining short-form games. Get ready to shine alongside your fellow improvisers as you perform in our friendly Improv Comedy Club. It's an exhilarating experience, and we can't wait to welcome you!",
};

export const playbackCourse: CourseType = {
  courseName: "Playback course",
  courseDuration: "21.08 - 12.11",
  courseImg: PlaybackImg,
  courseBackground: PlaybackBG,
  courseLink: 'playback-course',
  coursePrice: '45$',
  courseRoadmap: [
    {
      roadmapId: 1,
      roadmapTitle: 'Learn 6 forms of playback theater',
    },
    {
      roadmapId: 2,
      roadmapTitle: 'Develop Emotional Understanding',
      listStyle: true,
      roadmapText: [
        'Learn to read emotions in others.',
        'Observe facial expressions and body language'
      ],
    },
    {
      roadmapId: 3,
      roadmapTitle: 'Foster Team Spirit and Unity',
      listStyle: true,
      roadmapText: [
        'Think as a cohesive whole.',
        'Cultivate teamwork and collaboration.'
      ],
    },
    {
      roadmapId: 4,
      roadmapTitle: 'Sharpen Quick Reflexes, Flexibility, and Leadership',
      listStyle: true,
      roadmapText: [
        'Hone your ability to react swiftly.', 
        'Adapt to changing situations. Cultivate leadership skills.'
      ],
    },
    {
      roadmapId: 5,
      roadmapTitle: 'Enhance Your Acting Craft',
      listStyle: true,
      roadmapText: [
        'Work on your acting skills.',
        'Practice improvisation and spontaneity.',
      ],
    },
    {
      roadmapId: 6,
      roadmapTitle: 'Listen to Hundreds of Real Life Stories',
      listStyle: true,
      roadmapText: [
        "Engage with people's narratives.",
        'Learn to control your own feelings ',
      ],
    },
    {
      roadmapId: 7,
      roadmapTitle: 'Support Others in Coping with Difficult Emotions',
      listStyle: true,
      roadmapText: [
        'Help people navigate challenging feelings.',
        'Get on the stage with play back show',
      ],
    },
    {
      roadmapId: 8,
      roadmapTitle: 'Showtime!',
      showtime: true,
    },
  ],
  courseDescr:
    "8 week Playback Theatre Course: A Transformative Journey Playback is a live show with a healing effect. Audience shares theirs stories, director says a secret word and actors start playing the story focusing on audience's feelings. In this engaging course, you’ll explore six distinct forms of Playback Theatre. From emotional understanding to teamwork, quick reflexes, acting skills, and real-life narratives, you’ll develop valuable abilities. Plus, take the stage with a powerful playback show!",
};

export const allCourses = [dramaCourse, improCourse, playbackCourse];
