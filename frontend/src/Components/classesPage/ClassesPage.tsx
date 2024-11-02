import React, { useEffect, useState } from "react";
import "./ClassesPage.scss";
import { EventInfo } from "../general_components/personalAccount/MyCalendar/EventInfo";
import { CourseEvent } from "../../types/CourseEvent";
import { groupTrainings } from "../../utils/groupTraining";
import { getAllTraining } from "../../api/trainingApi";
import { GroupedLesson } from "../../types/GroupedLesson";
import { TrainingCell } from "./trainingCell/TrainingCell";
import { allClasses } from "../../utils/allClasses";
import { NewCourseEvents } from "../../types/newCourseEvent";
import { ClassCreatingForm } from "./ClassCreatingForm";


export const ClassesPage: React.FC = () => {
  const [currentEvent, setCurrentEvent] = useState<CourseEvent | null>(null);
  const [groupedTrainings, setGroupedTrainings] = useState<GroupedLesson[]>()

  useEffect(() => {
    
    getAllTraining().then(allTrainings => {
      // const newGroupedTrainings = groupTrainings(allTrainings);
      const newGroupedTrainings = groupTrainings(allClasses);
      
      setGroupedTrainings(newGroupedTrainings);
    })
  }, []) 
  
  return (
    <main className="classes-page">
      <div className="classes-page__container">
        <h1 className="classes-page__title">Our Classes</h1>
        <ClassCreatingForm />
        <ul className="classes-page__list">
          {groupedTrainings?.map((training) => (
            <li className="classes-page__li" key={training.title}>
              <TrainingCell training={training} setCurrentEvent={setCurrentEvent} />
            </li>
          ))}
        </ul>
      </div>
      <EventInfo currentEvent={currentEvent} setCurrentEvent={setCurrentEvent} />
    </main>
  );
};
