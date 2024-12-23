import React, { useEffect, useState } from "react";
import "./TimeTable.scss";
import cn from "classnames";
import { SignButton } from "../general_components/signButton";
import masks from "../img/timetable/masks.png";
import { MyCalendar } from "../general_components/personalAccount/MyCalendar";
import { EventInfo } from "../general_components/personalAccount/MyCalendar/EventInfo";
import { ClassesAPI } from "../../types/ClassesAPI";
import { CourseEvent } from "../../types/CourseEvent";
import { useAppContext } from "../../AppContext";
import { Loader } from "../general_components/Loader";

export const TimeTable: React.FC = () => {
  const days = [
    {
      day: "Sunday",
      schedule: [
        {
          duration: "14:30-16:30",
          classtype: "CU Cast Rehearsal",
        },
        {
          duration: "17:00-18:00",
          classtype: "Heels",
        },
        {
          duration: "18:00-19:00",
          classtype: "Exotic",
        },
      ],
    },
    {
      day: "Monday",
      schedule: [
        {
          duration: "14:00-15:00",
          classtype: "Heels",
        },
        {
          duration: "17:30-18:30",
          classtype: "Stretching",
        },
      ],
    },
    {
      day: "Tuesday",
      schedule: [
        {
          duration: "14:00-15:00",
          classtype: "Heels",
        },
        {
          duration: "17:30-18:30",
          classtype: "Stretching",
        },
      ],
    },
    {
      day: "Wednesday",
      schedule: [
        {
          duration: "13:00-14:00",
          classtype: "Heels",
        },
        {
          duration: "14:30-16:30",
          classtype: "CU Cast Rehearsal",
        },
      ],
    },
    {
      day: "Thursday",
      schedule: [
        {
          duration: "17:30-18:30",
          classtype: "Stretching",
        },
      ],
    },
    {
      day: "Friday",
      schedule: [
        {
          duration: "10:30-12:30 ",
          classtype: "CU Cast Rehearsal",
        },
        {
          duration: "13:00-14:00",
          classtype: "Twerk",
        },
        {
          duration: "14:00-15:00",
          classtype: "Heels",
        },
      ],
    },
    {
      day: "Saturday",
      schedule: [
        {
          duration: "14:00-15:30",
          classtype: "Drama Course 03",
        },
      ],
    },
  ];
  const courses = [
    {
      coursesName: "Stretching/Heels/Twerk",
      typeAndPrice: [
        {
          classType: "Group class",
          classPrice: "15 EUR",
        },
        {
          classType: "Private class",
          classPrice: "40 EUR",
        },
        {
          classType: "Private class for two",
          classPrice: "25 EUR / per person",
        },
      ],
    },
    {
      coursesName: "Pole Dance/Exotic",
      typeAndPrice: [
        {
          classType: "Group class",
          classPrice: "20 EUR",
        },
        {
          classType: "Private class",
          classPrice: "50 EUR",
        },
        {
          classType: "Private class for two",
          classPrice: "35 EUR / per person",
        },
      ],
    },
    {
      coursesName: "Drama course",
      typeAndPrice: [
        {
          classType: "12 Drama classes",
          classPrice: "250 EUR",
        },
      ],
    },
  ];
  const [activeDay, setActiveDay] = useState<string | null>("Tuesday");
  const [currentEvent, setCurrentEvent] = useState<ClassesAPI | CourseEvent | null>(null);
  const { timetablePageLoader } = useAppContext();

  useEffect(() => {
    const currentData = new Date();
    const currentDay = currentData.getDay();

    const nameCurrentDay = days[currentDay].day;

    setActiveDay(nameCurrentDay);
  }, []);

  return (
    timetablePageLoader ? (
      <Loader />
    ) : (
      <div className="schedule">
        <div className="schedule__container">
          <h2 className="schedule__title title">Timetable</h2>
          <div className="schedule__timetable">
            <div className="schedule__days">
              {days.map((day) => (
                <div key={day.day} className="schedule__day">
                  <div className="schedule__day-info">
                    <h3 className="schedule__day-title">{day.day}</h3>
                    {activeDay === day.day ? (
                      <button
                        type="button"
                        className="schedule__day-button"
                        onClick={() => setActiveDay(null)}
                      ></button>
                    ) : (
                      <button
                        type="button"
                        className="schedule__day-button schedule__day-button--open"
                        onClick={() => setActiveDay(day.day)}
                      ></button>
                    )}
                  </div>
                  <div
                    className={cn("schedule__day-classes", {
                      "schedule__day-classes--active": activeDay === day.day,
                    })}
                  >
                    {day.schedule.map((lesson, index) => (
                      <p
                        key={index}
                        className="schedule__day-class"
                      >{`${lesson.classtype} - ${lesson.duration}`}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <img className="schedule__masks" src={masks} alt="" />
          </div>
          <SignButton title="More classes" path="/classes" />
          <h2 className="schedule__title title">Pricelist</h2>
          <div className="schedule__pricelist">
            {courses.map((course) => (
              <div key={course.coursesName} className="schedule__classtype">
                <h3 className="schedule__pricelist-name">{course.coursesName}</h3>
                {course.typeAndPrice.map((sect, index) => (
                  <p key={index} className="schedule__pricelist-price">
                    {sect.classType}- <b>{sect.classPrice}</b>
                  </p>
                ))}
              </div>
            ))}
          </div>
          <SignButton title="Sign for a course" path="/our-courses" />
          <div className="schedule__calendar">
            <h3 className="schedule__main-title">Schedule</h3>
            <MyCalendar setCurrentEvent={setCurrentEvent} />
          </div>
        </div>
        <EventInfo
          currentEvent={currentEvent}
          setCurrentEvent={setCurrentEvent}
        />
      </div>
    )
  );
};
