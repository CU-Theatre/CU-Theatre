import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import './MyCalendar.scss';
import { useCalendarSize } from '../../../../hooks/useCalendarSize';
import { allCourses } from '../../../../utils/courses';
import { useMediaQuery } from 'react-responsive';
import { TABLE_MIN_WIDTH } from '../../../../utils/globalVariables';
import { CalendarModal } from './CalendarModal';
import React, { useState } from 'react';
import { CourseEvent } from '../../../../types/CourseEvent';
import { useAppContext } from '../../../../AppContext';

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface Props {
  setCurrentEvent: React.Dispatch<React.SetStateAction<CourseEvent | null>>;
}

export const MyCalendar: React.FC<Props> = ({ setCurrentEvent }) => {
  const [dramaCourse] = allCourses;
  const { setEventInfoIsOpen } = useAppContext();
  const [courses, setCourses] = useState(dramaCourse.courseTime);
  const isMobile = useMediaQuery({ query: `(max-width: ${TABLE_MIN_WIDTH}px)` });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const recurringEvents = courses.flatMap(event => {
    if (event.rrule) {
      const rule = event.rrule;
      return rule.all().map(date => {
        const start = new Date(date);
        start.setHours(event.start.getHours(), event.start.getMinutes());
        const end = new Date(date);
        end.setHours(event.end.getHours(), event.end.getMinutes());
        
        return {
          title: event.title,
          start,
          end,
        };
      });
    }
    return [event];
  });

  const { calendarSize} = useCalendarSize();
  
  const handleEventClick = (event: CourseEvent) => {
    setEventInfoIsOpen(false);
    setCurrentEvent(event)
  };

  return (
    <div className='account-calendar'>
      <button
        onClick={() => setModalIsOpen(true)} 
        type='button' 
        className='account-calendar__button'
      >
        Create new event
      </button>
        <CalendarModal setCourses={setCourses} setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen}/>
      <div className='account-calendar__wrapper'>
        <Calendar
          localizer={localizer}
          events={recurringEvents}
          defaultView={isMobile ? 'day' : 'month'}
          views={isMobile ? ['day'] : ['month', 'week', 'day']}
          style={calendarSize}
          onSelectEvent={handleEventClick}
        />
      </div>
    </div>
  );
};