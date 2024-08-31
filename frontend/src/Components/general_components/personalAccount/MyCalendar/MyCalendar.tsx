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
import { useState } from 'react';

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

export const MyCalendar = () => {
  const [dramaCourse] = allCourses;
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

  return (
    <div className='account-calendar'>
      <button
        onClick={() => setModalIsOpen(true)} 
        type='button' 
        className='account-calendar__button'
      >
        Create new event
      </button>
      {modalIsOpen && (
        <CalendarModal setCourses={setCourses} setModalIsOpen={setModalIsOpen}/>
      )}
      <div className='account-calendar__wrapper'>
        <Calendar
          localizer={localizer}
          events={recurringEvents}
          defaultView={isMobile ? 'day' : 'month'}
          views={isMobile ? ['day'] : ['month', 'week', 'day']}
          style={calendarSize}
        />
      </div>
    </div>
  );
};