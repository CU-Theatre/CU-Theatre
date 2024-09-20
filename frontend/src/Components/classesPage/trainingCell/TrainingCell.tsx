import React, { useState } from "react";
import "./TrainingCell.scss";
import { CourseEvent } from "../../../types/CourseEvent";
import { useAppContext } from "../../../AppContext";
import { GroupedLesson } from "../../../types/GroupedLesson";
import { getCurrentTraining } from "../../../api/trainingApi";
import { ErrorNotification } from "../../general_components/errorNotification";
import { useTokenLocalStorage } from "../../../hooks/useLocalStorage";
import { getCurrentUser } from "../../../api/userApi";
import { useNavigate } from "react-router-dom";

type Props = {
  training: GroupedLesson;
  setCurrentEvent: (p: CourseEvent) => void;
};

export const TrainingCell: React.FC<Props> = ({
  training,
  setCurrentEvent,
}) => {
  const { setEventInfoIsOpen, setEventDetailIsOpen } = useAppContext();
  const [isError, setIsError] = useState(false);
  const [token] = useTokenLocalStorage();
  const navigate = useNavigate()
  

  const { title, description, icon, dates } = training;

  const openClassDetails = (id: number) => {
    getCurrentUser(token).then(() => {
      getCurrentTraining(id)
      .then((currentTraining) => {
        if (currentTraining) {
          setCurrentEvent(currentTraining);
          setEventInfoIsOpen(false);
          setEventDetailIsOpen(true);
        } else {
          setIsError(true);
          console.log('currentTraining', currentTraining);
          
        }
      })
      .catch((err: Error) => {
        setIsError(true);
        console.log(err.message);
      });
    }).catch(() => {
      navigate('/log-in')
    })
  };

  return (
    <article className="training-cell">
      <img src={icon} alt="" className="training-cell__icon" />
      <div className="training-cell__main">
        <h3 className="training-cell__title">{title}</h3>
        <p className="training-cell__description">{description}</p>

        {dates.map((date) => (
          <button
            key={date.lessonId}
            className="training-cell__button"
            onClick={() => openClassDetails(date.lessonId)}
          >
            {date.date.getDate()}
          </button>
        ))}
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
