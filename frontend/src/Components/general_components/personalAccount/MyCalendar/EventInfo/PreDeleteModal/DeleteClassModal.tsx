import React from "react";
import { deleteClass } from "../../../../../../api/classesApi";
import { GroupedLesson } from "../../../../../../types/GroupedLesson";
import { useTokenLocalStorage } from "../../../../../../hooks/useLocalStorage";
import './DeleteClassModal.scss';

interface Props {
  classId: number | undefined;
  setGroupedTrainings?: React.Dispatch<React.SetStateAction<GroupedLesson[] | undefined>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteClassModal: React.FC<Props> = ({setGroupedTrainings, classId, setModalVisible }) => {
  const [token] = useTokenLocalStorage();

  const handleConfirmDelete = (classId: number) => {
    deleteClass(classId, token)
    .then(() => {
      if (setGroupedTrainings) setGroupedTrainings(prev => prev?.filter(training => training.id !== classId))
    })
    .catch(err => console.log(err));
  
    window.location.reload();
  }

  const handleCancelDelete = () => {
    setModalVisible(false);
  }

  return (
    <div className="deleteClassModal">
      <p className="deleteClassModal__title">
        Are you sure you want to delete this class?
      </p>
      <div className="deleteClassModal__buttons">
        <button
          type="button"
          className="deleteClassModal__button deleteClassModal__button--confirm"
          onClick={() =>classId && handleConfirmDelete(classId)}
        >
          Yes
        </button>
        <button
          type="button"
          className="deleteClassModal__button deleteClassModal__button--cancel"
          onClick={handleCancelDelete}
        >
          No
        </button>
      </div>
    </div>
  );
};