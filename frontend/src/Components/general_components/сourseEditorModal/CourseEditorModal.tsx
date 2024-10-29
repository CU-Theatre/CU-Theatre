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
import { ErrorNotification } from "../errorNotification";
import { RRule } from "rrule";
import { time } from "console";
import { createEvent } from "../../../utils/createEvent";

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
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  const onCreating: SubmitHandler<CreationCourseFormType> = (data) => {
    console.log("data", data);

    const { roadmap, maxPeople, classTime, ...sendingData } = data;

    // TODO write a handler save image
    sendingData.image = "aaa.jpg";

    try {
      // Ensure price and maxPeople are numbers and positive
      sendingData.price = Math.abs(parseFloat(sendingData.price as unknown as string)) || 0;
    } catch {
      console.error("Invalid price or maxStudents format");
      return;
    }

    const maxStudents = maxPeople ? Math.abs(parseInt(maxPeople as unknown as string, 10)) || 0 : 0;
    sendingData.startDate = new Date(sendingData.startDate).toISOString();
    sendingData.finishDate = new Date(sendingData.finishDate).toISOString();

    const formattedData = {
      name: sendingData.name,
      description: sendingData.description,
      startDate: sendingData.startDate,
      finishDate: sendingData.finishDate,
      image: sendingData.image,
      icon: sendingData.icon || "default-icon", // Ensure icon is set
      price: sendingData.price,
      maxStudents: maxStudents,
    };

    // const newClassTime = classTime.map((time) => {
    //   console.log(time);

    //   return createEvent(
    //     time,
    //     sendingData.name,
    //     sendingData.finishDate,
    //     sendingData.startDate,
    //     sendingData.description,
    //     sendingData.icon
    //   );
    // });

    // console.log("newClassTime", newClassTime);

    console.log("formattedData", formattedData);

    setIsLoading(true);
    createCourse(formattedData, token)
      .then((newCourse) => {
        console.log("newCourse", newCourse);

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
      .catch((err: Error) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onEdit: SubmitHandler<CreationCourseFormType> = (data) => {
    // TODO add function edit course
    console.log(data);
  };

  return (
    <>
      <article
        className={classNames("course-editor-modal", {
          "course-editor-modal--open": isOpen,
          "course-editor-modal--loading": isLoading,
        })}
      >
        <ButtonCross onClick={!isLoading ? onClose : () => {}} />

        <h1 className="course-editor-modal__title title">
          {isCreating ? "Create" : "Edit"} course
        </h1>

        <CreationCourse
          onSubmit={isCreating ? onCreating : onEdit}
          isCreating={isCreating}
          isLoading={isLoading}
        />
      </article>

      {isError && (
        <ErrorNotification
          message="Ops, something went wrong"
          setIsError={setIsError}
        />
      )}
    </>
  );
};
