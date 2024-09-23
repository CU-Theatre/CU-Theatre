export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const addWeeks = (currentWeek: { start: Date, end: Date }, numberOfWeeks: number) => {
  const newStart = new Date(currentWeek.start);
  newStart.setDate(newStart.getDate() + numberOfWeeks * 7);

  const newEnd = new Date(newStart);
  newEnd.setDate(newStart.getDate() + 6);

  return { start: newStart, end: newEnd };
};

export const getWeek = (date: Date) => {
  const firstDayOfWeek = date.getDate() - date.getDay();
  const start = new Date(date.setDate(firstDayOfWeek));
  const end = new Date(date.setDate(firstDayOfWeek + 6));
  return { start, end };
};