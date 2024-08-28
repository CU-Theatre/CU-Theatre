import React from "react";
import { CourseType } from "../../../../types/CourseType";
import './CourseRodmap.scss';
import classNames from "classnames";

interface Props {
  course: CourseType;
}

export const CourseRoadmap: React.FC<Props> = ({ course }) => {
  return (
    <div className='course-window__roadmap roadmap'>
      {course.courseRoadmap.map((period, index) => (
        <div className={classNames(`roadmap__block roadmap__block--${index}`, {'roadmap__block--showtime': period.showtime})} key={period.roadmapId}>
          <div className="roadmap__info">
            {course.courseName === 'Drama course' ? (
            <div className="roadmap__period"><p className="roadmap__week">Week</p> {period.roadmapId}</div>
            ) : (
              <div className="roadmap__period">{period.roadmapId}</div>
            )}
            <h4 className="roadmap__title">{period.roadmapTitle}</h4>
          </div>
          {period.roadmapText && (
            <div className="roadmap__text">
              {period.listStyle ? (
                <ul className="roadmap__list">
                  {typeof period.roadmapText === 'object' &&  (
                    period.roadmapText.map(content => (
                      <li className="roadmap__item" key={content}>{content}</li>
                    ))
                  )}
                </ul>
              ) : (
                <p className="roadmap__content">{period.roadmapText}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};