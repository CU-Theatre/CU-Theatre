import React, { useEffect } from "react";
import "./CourseEditorModal.scss";
import { CreationCourse } from "../creationCourse";
import classNames from "classnames";
import { ButtonCross } from "../buttonCross";
import { useAppContext } from "../../../AppContext";
import { SubmitHandler } from "react-hook-form";
import { CreationCourseFormType } from "../../../types/CreationCourseFormType";

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

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  const onCreating: SubmitHandler<CreationCourseFormType> = (data) => {
    // TODO add function creation course
    console.log(data);
  }

  const onEdit: SubmitHandler<CreationCourseFormType> = (data) => {
    // TODO add function edit course
    console.log(data);
  }


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

      <CreationCourse isOpen onSubmit={isCreating ? onCreating : onEdit} isCreating={isCreating}  />
    </article>
  );
};
