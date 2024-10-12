import React from "react";
import { DayOfWeek } from "../../../../types/DayOfWeek";
import { Events, Guest, MainEvents, OtherClasses } from "../../../../types/Events";
import './PreDeleteModal.scss';

interface PreDeleteModalProps {
  isVisible: boolean;
  setIsPreDeleteVisible: React.Dispatch<React.SetStateAction<boolean>>
  deleteDetails: {
    phone?: string;
    category: string;
    day: DayOfWeek;
    date: string;
    isClass: boolean;
} | null;
setEventList: React.Dispatch<React.SetStateAction<Events | undefined>>;
}

export const PreDeleteModal: React.FC<PreDeleteModalProps> = ({
  isVisible,
  setIsPreDeleteVisible,
  deleteDetails,
  setEventList,
}) => {
  if (!isVisible) return null;

  const handleCancelDelete = () => {
    setIsPreDeleteVisible(false);
  };

  const handleConfirmDelete = () => {
    if (deleteDetails) {
      const { phone, category, day, date, isClass } = deleteDetails;
      if (isClass) {
        handleDeleteUserFromClass(phone, category as keyof Events["otherClasses"], day, date);
      } else {
        handleDeleteUserFromShow(phone, category as keyof Events["mainEvents"], day, date);
      }
      setIsPreDeleteVisible(false);
    }
  };

  const handleDeleteUserFromShow = (
    phone: string | undefined, 
    category: keyof MainEvents, 
    day: DayOfWeek, 
    date: string
  ) => {
    setEventList(prevEvents => {
      if (!prevEvents || !prevEvents.mainEvents || !prevEvents.mainEvents[category]) {
        console.log("Error: No events found for show deletion");
        return prevEvents;
      }
  
      const updatedEvents: Events = { ...prevEvents };

      updatedEvents.mainEvents[category] = updatedEvents.mainEvents[category].filter(
        (event: Guest) => !(event.dayOfWeek === day && event.date === date && event.phone === phone)
      );

      return updatedEvents;
    });
  };

  const handleDeleteUserFromClass = (
    phone: string | undefined, 
    category: keyof OtherClasses,
    day: DayOfWeek, 
    date: string
  ) => {
    setEventList(prevEvents => {
      if (!prevEvents) return prevEvents; 
  
      const updatedEvents: Events = { ...prevEvents };

      updatedEvents.otherClasses[category] = updatedEvents.otherClasses[category].filter(
        (event: Guest) => !(event.dayOfWeek === day && event.date === date && event.phone === phone)
      );

  
      return updatedEvents;
    });
  };

  return (
    <div className="deleteModal">
      <p className="deleteModal__title">
        Are you sure you want to cancel this user reservation?
      </p>
      <div className="deleteModal__buttons">
        <button
          type="button"
          className="deleteModal__button deleteModal__button--confirm"
          onClick={handleConfirmDelete}
        >
          Yes
        </button>
        <button
          type="button"
          className="deleteModal__button deleteModal__button--cancel"
          onClick={handleCancelDelete}
        >
          No
        </button>
      </div>
    </div>
  );
};