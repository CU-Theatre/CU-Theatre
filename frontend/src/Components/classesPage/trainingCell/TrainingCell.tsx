import React, { useState } from "react";
import "./TrainingCell.scss";
import { useAppContext } from "../../../AppContext";
import { GroupedLesson } from "../../../types/GroupedLesson";
import { ErrorNotification } from "../../general_components/errorNotification";
import { useTokenLocalStorage } from "../../../hooks/useLocalStorage";
import { getCurrentUser } from "../../../api/userApi";
import { useNavigate } from "react-router-dom";
import { getClass } from "../../../api/classesApi";
import { ClassesAPI } from "../../../types/ClassesAPI";

type Props = {
  training: GroupedLesson;
  setCurrentEvent: (p: ClassesAPI) => void;
  setGroupedTrainings: (value: React.SetStateAction<GroupedLesson[] | undefined>) => void;
};

export const TrainingCell: React.FC<Props> = ({
  training,
  setCurrentEvent,
  setGroupedTrainings,
}) => {
  const { setEventInfoIsOpen, setEventDetailIsOpen } = useAppContext();
  const [isError, setIsError] = useState(false);
  const [token] = useTokenLocalStorage();
  const navigate = useNavigate();

  const { title, description, icon, dates } = training;

  const openClassDetails = (classId: number) => {
    getCurrentUser(token)
      .then(() => {
        getClass(classId, token)
          .then((currentTraining) => {
            if (currentTraining) {
              setCurrentEvent(currentTraining);
              setEventInfoIsOpen(false);
              setEventDetailIsOpen(true);
            } else {
              setIsError(true);
              console.log("currentTraining", currentTraining);
            }
          })
          .catch((err: Error) => {
            setIsError(true);
            console.log(err.message);
          });
      })
      .catch(() => {
        navigate("/log-in");
      });
  };

  return (
    <article className="training-cell">
      <img src={icon} alt="" className="training-cell__icon" />
      <div className="training-cell__main">
        <h3 className="training-cell__title">{title}</h3>
        <p className="training-cell__description">{description}</p>

        <div className="training-cell__buttons">
          {dates.map((date) => (
            <button
              key={date.lessonId}
              className="training-cell__button"
              onClick={() => openClassDetails(date.lessonId)}
            >
              {new Date(date.date).getDate()}
            </button>
          ))}
        </div>
      </div>
      <div className="training-cell__error">
        {isError && (
          <ErrorNotification
            message="Ops, something went wrong"
            setIsError={setIsError}
          />
        )}
      </div>
    </article>
  );
};
