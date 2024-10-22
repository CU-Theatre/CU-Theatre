import React from "react";
import "./Course.scss";
import { CourseButton } from "./courseButton";
import { allCourses } from "../../../utils/courses";

type Props = {
  courseId: number;
};

export const Course: React.FC<Props> = ({ courseId }) => {
  const course = allCourses[courseId];
  const { icon, name, description } = course;

  return (
    <div className="course">
      <img className="course__image" src={icon} alt="icon" />
      <div className="course__content">
        <h4 className="course__name">{name}</h4>
        <p className="course__decr">{description}</p>

        <CourseButton course={course} />
      </div>
    </div>
  );
};
