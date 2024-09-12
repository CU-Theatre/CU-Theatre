import React, { useEffect, useState } from "react";
import { allCourses } from "../../utils/courses";
import { Course } from "../general_components/Course";
import "./OurCoursesPage.scss";
import { CoursesWindow } from "../general_components/CoursesWindow";
import { getCurrentUser } from "../../api/userApi";
import { useTokenLocalStorage } from "../../hooks/useLocalStorage";
import { useAppContext } from "../../AppContext";
import { CourseEditorModal } from "../general_components/сourseEditorModal";
import { ButtonEdd } from "../general_components/buttonEdd";

export const OurCoursesPage: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [token] = useTokenLocalStorage();
  const { setUserState, setIsLoginned } = useAppContext();

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

  const addNewCourse = () => {
    setIsCreatingCourse(true);
  };

  const onClose = () => {
    setIsCreatingCourse(false);
  };

  return (
    <main className="our-courses-page">
      <div className="our-courses-page__container">
        <h1 className="our-courses-page__title">OUR COURSES</h1>

        {isAdmin && (
          <>
            <ButtonEdd onClick={addNewCourse} />

            <CourseEditorModal
              isOpen={isCreatingCourse}
              isCreating
              onClose={onClose}
            />
          </>
        )}

        <div className="our-courses-page__courses">
          {allCourses.map((course) => (
            <Course key={course.courseName} course={course} />
          ))}
        </div>
      </div>
      <CoursesWindow />
    </main>
  );
};
