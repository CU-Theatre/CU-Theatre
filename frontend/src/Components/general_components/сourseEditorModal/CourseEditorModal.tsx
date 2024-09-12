import React, { useEffect } from "react";
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

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  const onCreating: SubmitHandler<CreationCourseFormType> = (data) => {
    const { roadmap, ...sendingData } = data;

    sendingData.image = 'GGFGFGFGFGF';

    sendingData.finishDate = new Date(sendingData.finishDate).toJSON();
    sendingData.startDate = new Date(sendingData.startDate).toJSON();

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
          console.log(res);
        });
      })
      .catch()
      .finally(() => {
        // TODO add save screen
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
      })}
    >
      <ButtonCross onClick={onClose} />

      <h1 className="course-editor-modal__title title">
        {isCreating ? "Create" : "Adit"} course
      </h1>

      <CreationCourse
        isOpen
        onSubmit={isCreating ? onCreating : onEdit}
        isCreating={isCreating}
      />
    </article>
  );
};
