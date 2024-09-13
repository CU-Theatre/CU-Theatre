import React from "react";
import { CourseType } from "../../../../types/CourseType";
import "./CourseRodmap.scss";
import classNames from "classnames";

interface Props {
  course: CourseType;
}

export const CourseRoadmap: React.FC<Props> = ({ course }) => {
  return (
    <div className="course-window__roadmap roadmap">
      {course.roadmap.map((period, index) => (
        <div
          className={classNames(`roadmap__block roadmap__block--${index}`)}
          key={period.id}
        >
          <div className="roadmap__info">
            <div className="roadmap__period">{period.mainTitle}</div>
            <h4 className="roadmap__title">{period.title}</h4>
          </div>
          {period.text && (
            <div className="roadmap__text">
              <p className="roadmap__content">{period.text}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
