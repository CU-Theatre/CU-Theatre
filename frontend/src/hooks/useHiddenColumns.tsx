import { useState } from 'react';
import { DayOfWeek } from '../types/DayOfWeek';

export const useHiddenColumns = () => {
  const [hiddenColumns, setHiddenColumns] = useState<Record<'impro' | 'playback' | 'livePerf', Record<DayOfWeek, boolean>>>({
    impro: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
    playback: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
    livePerf: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    },
  });

  const toggleColumnVisibility = (column: 'impro' | 'playback' | 'livePerf', day: DayOfWeek) => {
    setHiddenColumns(prevState => ({
      ...prevState,
      [column]: {
        ...prevState[column],
        [day]: !prevState[column][day],
      },
    }));
  };

  return { hiddenColumns, toggleColumnVisibility };
};