import React from "react";
import { CourseType } from "../../../types/CourseType";
import "./Course.scss";
import { useAppContext } from "../../../AppContext";
import { Link } from "react-router-dom";

type Props = {
  course: CourseType;
};

const REQUIRED_COURSE = "drama course";

export const Course: React.FC<Props> = ({ course }) => {
  const { isLoginned, userState } = useAppContext();

  const { courseImg, courseName, courseDescr, courseDuration } = course;

  return (
    <div className="course">
      <img className="course__image" src={courseImg} alt="icon" />
      <div className="course__content">
        <h4 className="course__name">{courseName}</h4>
        <p className="course__decr">{courseDescr}</p>

        {!isLoginned || userState.currentCourse.length === 0 ? (
          <>
            {courseName.toLowerCase() === REQUIRED_COURSE ? (
              <div className="course__start">
                <Link to="">Start course</Link>
              </div>
            ) : (
              <div className="course__close">
                <p className="course__close-text">
                  Only for drama course finishers
                </p>
              </div>
            )}
          </>
        ) : (
          <></>
        )}

        {userState?.dramaCourseFinisher}

        <div className="course__duration">
          <p>Course duration:</p>
          <p>{courseDuration}</p>
        </div>
      </div>
    </div>
  );
};
