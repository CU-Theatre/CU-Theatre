import React, { useEffect, useState } from "react";
import "./CoursesWindow.scss";
import classNames from "classnames";
import { useAppContext } from "../../../AppContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { WindowSwiper } from "../ModalWindowSwiper";
import { CourseRoadmap } from "./courseRodmap";
import { Footer } from "../footer";
import { useTokenLocalStorage } from "../../../hooks/useLocalStorage";
import { getCurrentUser } from "../../../api/userApi";
import { CourseEditorModal } from "../сourseEditorModal";

export const CoursesWindow: React.FC = () => {
  const courseFor = [
    "seek to express through movement.",
    "dance with their soul.",
    "find magic in every performance.",
    "wish to bring stories to life.",
    "communicate through the art of dance.",
    "live to perform on stage.",
    "breathe through expression.",
  ];

  const {
    courseModal,
    courseInfo: course,
    setCourseModal,
    setUserState,
    setIsLoginned,
  } = useAppContext();

  const [isAdmin, setIsAdmin] = useState(true);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [token] = useTokenLocalStorage();

  useEffect(() => {
    getCurrentUser(token)
      .then((user) => {
        if (user.role === "admin") {
          setIsAdmin(true);
        }
        setUserState(user);
        setIsLoginned(true);
      })
      .catch((err: Error) => {
        setIsLoginned(false);
        console.error(err);
      });
  }, []);

  const editCourse = () => {
    setIsEditingCourse(true);
  };

  const onCloseEditor = () => {
    setIsEditingCourse(false);
  };

  const onCLoseWindow = () => {
    setCourseModal(false);
  };

  useEffect(() => {
    return () => {
      setCourseModal(false);
    };
  }, []);

  return (
    <section
      className={classNames("course-window", { "modal-open": !courseModal })}
    >
      <div className="course-window__container">
        <div className="course-window__about">
          <div className="course-window__top">
            <button
              onClick={onCLoseWindow}
              type="button"
              className="course-window__close"
            ></button>
            <h2 className="course-window__title title">{course.courseName}</h2>

            {isAdmin && (
              <>
                <button
                  type="button"
                  className="course-window__edit-button"
                  onClick={editCourse}
                >
                  Edit
                </button>
                <CourseEditorModal
                  isOpen={isEditingCourse}
                  onClose={onCloseEditor}
                />
              </>
            )}
          </div>

          <div className="course-window__image-for">
            <div className="course-window__for">
              <p className="course-window__subtitle">
                {" "}
                This course for those who{" "}
              </p>
              <Swiper
                modules={[Autoplay]}
                className="course-window__quotes"
                autoplay={{
                  delay: 5000,
                }}
                allowTouchMove={false}
                direction="vertical"
                loop={true}
              >
                {courseFor.map((quote) => (
                  <SwiperSlide className="course-window__quote" key={quote}>
                    {quote}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <img
              className="course-window__image"
              src={course.courseBackground}
              alt="groupPhoto"
            />
          </div>
        </div>
        <div className="course-window__benefits">
          <h3 className="course-window__headline">You can improve</h3>
          <WindowSwiper />
        </div>
        <div className="course-window__info">
          <h2 className="course-window__headline course-window__headline--how">
            How the course works
          </h2>
          <CourseRoadmap course={course} />
        </div>
        <div className="course-window__bottom-block">
          <div className="course-window__date">
            <div className="course-window__info-schedule">
              <p className="course-window__info-title">Dates</p>
              <p className="course-window__info-subtitle">
                {course.courseDuration}
              </p>
            </div>
            <div className="course-window__info-schedule">
              <p className="course-window__info-title">Price</p>
              <p className="course-window__info-subtitle">
                {course.coursePrice}
              </p>
            </div>
          </div>
          <div className="course-window__buttons">
            <button
              type="button"
              className="course-window__button course-window__button--left"
            >
              Book
            </button>
            <button
              type="button"
              className="course-window__button course-window__button--right"
            >
              Connect with me
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};
