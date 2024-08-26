import React, { useEffect, useState } from "react";
import "./CourseButton.scss";
import { useAppContext } from "../../../../AppContext";
import { REQUIRED_COURSE } from "../../../../utils/globalVariables";
import { CourseType } from "../../../../types/CourseType";
import { Link } from "react-router-dom";

type Props = {
  course: CourseType;
};

enum StatusButton {
  BUY = "BUY",
  DURATION = "DURATION",
  LOCK = "LOCK",
}
export const CourseButton: React.FC<Props> = ({ course }) => {
  const { isLoginned, userState } = useAppContext();
  const [buttonStatus, setButtonStatus] = useState<StatusButton>();

  const { courseName, courseDuration } = course;

  const setStatusBasedOnCurrent = () => {
    if (userState?.currentCourse.includes(course)) {
      setButtonStatus(StatusButton.DURATION);
    } else {
      setButtonStatus(StatusButton.BUY);
    }
  };

  useEffect(() => {
    if (isLoginned) {
      if (courseName.toLowerCase() === REQUIRED_COURSE) {
        setStatusBasedOnCurrent();
      } else if (userState?.dramaCourseFinisher) {
        setStatusBasedOnCurrent();
      } else {
        setButtonStatus(StatusButton.LOCK);
      }
    } else if (courseName.toLowerCase() === REQUIRED_COURSE) {
      setButtonStatus(StatusButton.BUY);
    } else {
      setButtonStatus(StatusButton.LOCK);
    }
  }, [isLoginned, courseName, courseDuration, userState]);

  return (
    <>
      {buttonStatus === StatusButton.BUY && (
        <button className="course-button course-button--buy">
          {/* TODO add link to buy-page */}
          <Link to={""} className="course-button__text">
            Start course
          </Link>
        </button>
      )}

      {buttonStatus === StatusButton.LOCK && (
        <div className="course-button course-button--lock">
          {/* TODO add link to buy-page */}
          <span className="course-button__text">
            Only for drama course finishers
          </span>
        </div>
      )}

      {buttonStatus === StatusButton.DURATION && (
        <div className="course-button course-button--duration">
          {/* TODO add link to buy-page */}
          <span className="course-button__text">Course duration:</span>
          <span className="course-button__text course-button__text--duration">
            {courseDuration}
          </span>
        </div>
      )}
    </>
  );
};
