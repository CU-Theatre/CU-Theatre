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
    console.log("data", data);

    const { roadmap, maxPeople, subscribed, ...sendingData } = data;

    // TODO write a handler save image
    sendingData.image = "aaa.jpg";

    try {
      if (typeof sendingData.price === "string") {
        sendingData.price = parseFloat(sendingData.price);
        sendingData.price = Math.abs(sendingData.price);
      }
      // if (typeof sendingData.maxPeople === "string") {
      //   sendingData.maxPeople = parseFloat(sendingData.maxPeople);
      //   sendingData.maxPeople = Math.abs(sendingData.maxPeople);
      // }
    } catch {
      // TODO write a errHandler when prise isn't number
    }

    sendingData.finishDate = new Date(sendingData.finishDate).toISOString();
    sendingData.finishDate = sendingData.finishDate.split(".")[0];
    sendingData.finishDate = sendingData.finishDate.split("T").join(' ');
    sendingData.startDate = new Date(sendingData.startDate).toISOString();
    sendingData.startDate = sendingData.startDate.split(".")[0];
    sendingData.startDate = sendingData.startDate.split("T").join(' ');

    console.log("sendingData", sendingData);

    setIsLoading(true);
    createCourse(sendingData, token)
      .then((newCourse) => {
        console.log('newCourse', newCourse);

        if (roadmap) {
          roadmap.forEach((point) => {
            console.log({ ...point, courseId: newCourse.id });
            
            addToRoadmap({ ...point, courseId: newCourse.id }, token).catch(
              (err) => {
                console.log("ERROR when addToRoadmap");
              }
            );
          });
        }
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
