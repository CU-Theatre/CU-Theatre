import React, { useEffect, useState } from "react";
import "./CourseEditorModal.scss";
import { CreationCourse } from "../creationCourse";
import classNames from "classnames";
import { ButtonCross } from "../buttonCross";
import { useAppContext } from "../../../AppContext";
import { SubmitHandler } from "react-hook-form";
import { CreationCourseFormType } from "../../../types/CreationCourseFormType";
import { createCourse, getAllCourse } from "../../../api/courseApi";
import { addToRoadmap } from "../../../api/roadmapApi";
import { useTokenLocalStorage } from "../../../hooks/useLocalStorage";

type Props = {
  isCreating?: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export const CourseEditorModal: React.FC<Props> = ({
  isCreating = false,
  isOpen,
  onClose,
}) => {
  const { setModalIsOpen } = useAppContext();
  const [token] = useTokenLocalStorage();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  const onCreating: SubmitHandler<CreationCourseFormType> = (data) => {
    const { roadmap, ...sendingData } = data;

    sendingData.image = 'aaa.jpg'

    sendingData.finishDate = new Date(sendingData.finishDate).toJSON();
    sendingData.startDate = new Date(sendingData.startDate).toJSON();

    setIsLoading(true);
    createCourse(sendingData, token)
      .then((newCourse) => {
        roadmap.forEach((point) => {
          addToRoadmap({ ...point, courseId: newCourse.id }, token).catch(
            (err) => {
              console.log("ERROR when addToRoadmap");
            }
          );
        });
      })
      .then(() => {
        getAllCourse(token).then((res) => {
          console.log("res", res);
        });
      })
      .catch()
      .finally(() => {
        setIsLoading(false);
      });

    console.log("sendingData", sendingData);
  };

  const onEdit: SubmitHandler<CreationCourseFormType> = (data) => {
    // TODO add function edit course
    console.log(data);
  };

  return (
    <article
      className={classNames("course-editor-modal", {
        "course-editor-modal--open": isOpen,
        "course-editor-modal--loading": isLoading,
      })}
    >
      <ButtonCross onClick={!isLoading ? onClose : () => {}} />

      <h1 className="course-editor-modal__title title">
        {isCreating ? "Create" : "Adit"} course
      </h1>

      <CreationCourse
        isOpen
        onSubmit={isCreating ? onCreating : onEdit}
        isCreating={isCreating}
        isLoading={isLoading}
      />
    </article>
  );
};
