import React, { useEffect, useState } from "react";
import { CourseType } from "../../../../types/CourseType";
import "./CourseRodmap.scss";
import classNames from "classnames";

interface Props {
  course: CourseType;
}

export const CourseRoadmap: React.FC<Props> = ({ course }) => {
  const [sortedRoadmap, setSortedRoadmap] = useState(course.roadmap);

  useEffect(() => {
    const sortedRoadmap = [...course.roadmap];

    sortedRoadmap.sort((point1, point2) => point1.id - point2.id);

    setSortedRoadmap(sortedRoadmap);
  }, [course.roadmap]);

  return (
    <div className="course-window__roadmap roadmap">
      {sortedRoadmap.map((period, index) => (
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
