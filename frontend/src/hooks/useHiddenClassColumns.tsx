import { useState } from 'react';
import { DayOfWeek } from '../types/DayOfWeek';

export const useHiddenClassColumns = () => {
  const [hiddenClassColumns, setHiddenClassColumns] = useState<Record<'heels' | 'poleDance' | 'twerk' | 'exotic' | 'stretching', Record<DayOfWeek, boolean>>>({
    heels: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
    poleDance: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
    twerk: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
    exotic: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
    stretching: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
  });

  const toggleClassColumnVisibility = (column: keyof typeof hiddenClassColumns, day: DayOfWeek) => {
    setHiddenClassColumns(prevState => ({
      ...prevState,
      [column]: {
        ...prevState[column],
        [day]: !prevState[column][day],
      },
    }));
  };

  return { hiddenClassColumns, toggleClassColumnVisibility };
};