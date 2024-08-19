import React from "react";
import { allCourses } from "../../utils/courses";
import { Course } from "../general_components/Course";
import "./OurCoursesPage.scss";

export const OurCoursesPage: React.FC = () => {
  return (
    <main className="our-courses-page">
      <div className="our-courses-page__container">
        <h1 className="our-courses-page__title">OUR COURSES</h1>

        <div className="our-courses-page__courses">
          {allCourses.map((course) => (
            <Course key={course.courseName} course={course} />
          ))}
        </div>
      </div>
    </main>
  );
};
