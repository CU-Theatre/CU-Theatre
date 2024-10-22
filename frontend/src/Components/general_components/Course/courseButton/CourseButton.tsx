import React, { useEffect, useState } from "react";
import "./CourseButton.scss";
import { useAppContext } from "../../../../AppContext";
import { KEY_TOKEN, REQUIRED_COURSE } from "../../../../utils/globalVariables";
import { CourseType } from "../../../../types/CourseType";

type Props = {
  course: CourseType;
};

enum StatusButton {
  BUY = "BUY",
  DURATION = "DURATION",
  LOCK = "LOCK",
}
export const CourseButton: React.FC<Props> = ({ course }) => {
  const { isLoginned, userState, setCourseInfo, setCourseModal } = useAppContext();
  const [buttonStatus, setButtonStatus] = useState<StatusButton>(StatusButton.LOCK);

  const openCourseWindow = (course: CourseType) => {
    setCourseInfo(course);
    setCourseModal(true);
  }

  const { name, startDate, finishDate } = course;

  useEffect(() => {
    if (!isLoginned) {
      // Якщо користувач не залогінений, блокуємо всі курси
      setButtonStatus(StatusButton.LOCK);
    } else if (isLoginned && userState) {
      if (name.toLowerCase() === REQUIRED_COURSE) {
        // Якщо курс - це drama course, і користувач залогінений
        setButtonStatus(StatusButton.BUY);
      } else if (userState.dramaCourseFinished) {
        // Якщо користувач завершив drama course, всі інші курси доступні для купівлі
        setButtonStatus(StatusButton.BUY);
      } else {
        // Якщо користувач залогінений, але не завершив drama course
        setButtonStatus(StatusButton.LOCK);
      }
    }
  }, [isLoginned, userState, name]);

  return (
    <>
      {buttonStatus === StatusButton.BUY && (
        <button
          type="button"
          onClick={() => openCourseWindow(course)} 
          className="course-button course-button--buy">
          <p className="course-button__text">
            Learn more
          </p>
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
            {`${startDate} - ${finishDate}`}
          </span>
        </div>
      )}
    </>
  );
};
