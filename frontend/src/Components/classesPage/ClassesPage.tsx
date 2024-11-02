import React, { useEffect, useState } from "react";
import "./ClassesPage.scss";
import { EventInfo } from "../general_components/personalAccount/MyCalendar/EventInfo";
import { CourseEvent } from "../../types/CourseEvent";
import { groupTrainings } from "../../utils/groupTraining";
import { GroupedLesson } from "../../types/GroupedLesson";
import { TrainingCell } from "./trainingCell/TrainingCell";
import { ClassCreatingForm } from "./ClassCreatingForm";
import { getAllClasses } from "../../api/classesApi";
import { useTokenLocalStorage } from "../../hooks/useLocalStorage";
import { ClassesAPI } from "../../types/ClassesAPI";
import { Loader } from "../general_components/Loader";


export const ClassesPage: React.FC = () => {
  const [currentEvent, setCurrentEvent] = useState<ClassesAPI | CourseEvent | null>(null);
  const [groupedTrainings, setGroupedTrainings] = useState<GroupedLesson[]>()
  const [token] = useTokenLocalStorage();
  const [loaderPage, setLoaderPage] = useState(false);

  useEffect(() => {
    setLoaderPage(true);

    getAllClasses(token)
      .then((res) => {
        console.log(res);
      })
      .catch(err => console.log(err))
      .finally(() => setLoaderPage(false));
    
      getAllClasses(token).then((responce) => {
      const newGroupedTrainings = groupTrainings(responce as ClassesAPI[]);

      
      setGroupedTrainings(newGroupedTrainings);
    })
  }, []) 


  
  return (
    loaderPage ? (
      <Loader />
    ) : (
      <main className="classes-page">
        <div className="classes-page__container">
          <h1 className="classes-page__title">Our Classes</h1>
          <ClassCreatingForm />
          <ul className="classes-page__list">
            {groupedTrainings?.map((training) => (
              <li className="classes-page__li" key={training.title}>
                <TrainingCell training={training} setCurrentEvent={setCurrentEvent} setGroupedTrainings={setGroupedTrainings} />
              </li>
            ))}
          </ul>
        </div>
        <EventInfo currentEvent={currentEvent} setCurrentEvent={setCurrentEvent} setGroupedTrainings={setGroupedTrainings} />
      </main>
    )
  );
};
