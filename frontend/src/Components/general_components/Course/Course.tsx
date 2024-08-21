import React from "react";
import { CourseType } from "../../../types/CourseType";
import "./Course.scss";
import { CourseButton } from "./courseButton";

type Props = {
  course: CourseType;
};

export const Course: React.FC<Props> = ({ course }) => {
  const { courseImg, courseName, courseDescr } = course;

  return (
    <div className="course">
      <img className="course__image" src={courseImg} alt="icon" />
      <div className="course__content">
        <h4 className="course__name">{courseName}</h4>
        <p className="course__decr">{courseDescr}</p>

        <CourseButton course={course} />
      </div>
    </div>
  );
};
