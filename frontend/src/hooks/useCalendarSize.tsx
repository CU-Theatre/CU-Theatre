import { useState, useEffect } from 'react';
import { DESKTOP_MIN_WIDTH, TABLE_MIN_WIDTH } from '../utils/globalVariables';

export const useCalendarSize = () => {
  const [calendarSize, setCalendarSize] = useState({ width: '100%', height: 500 });

  const updateCalendarSize = () => {
    const newScreenWidth = window.innerWidth;

    if (newScreenWidth >= DESKTOP_MIN_WIDTH) {
      setCalendarSize({ width: '100%', height: 500 });
    } else if (newScreenWidth >= TABLE_MIN_WIDTH) {
      setCalendarSize({ width: '100%', height: 500 });
    } else {
      setCalendarSize({ width: '100%', height: 500 });
    }
  };

  useEffect(() => {
    updateCalendarSize();
    window.addEventListener('resize', updateCalendarSize);

    return () => {
      window.removeEventListener('resize', updateCalendarSize);
    };
  }, []);

  return { calendarSize };
};