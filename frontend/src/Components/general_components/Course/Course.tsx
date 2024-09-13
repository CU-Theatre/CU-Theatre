import React from "react";
import { CourseType } from "../../../types/CourseType";
import "./Course.scss";
import { CourseButton } from "./courseButton";

type Props = {
  course: CourseType;
};

export const Course: React.FC<Props> = ({ course }) => {
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
