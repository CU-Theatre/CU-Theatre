import React, { createContext, useContext, useEffect, useState } from "react";
import { user } from "./utils/user";
import { User } from "./types/User";
import { ShowType } from "./types/ShowType";
import { allShows } from "./utils/allShows";
import { allCourses } from "./utils/courses";
import { CourseType } from "./types/CourseType";

interface AppContextInterface {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginned: boolean;
  setIsLoginned: React.Dispatch<React.SetStateAction<boolean>>;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  modalsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalInfo: ShowType;
  setModalInfo: React.Dispatch<React.SetStateAction<ShowType>>;
  courseModal: boolean;
  setCourseModal: React.Dispatch<React.SetStateAction<boolean>>;
  courseInfo: CourseType;
  setCourseInfo: React.Dispatch<React.SetStateAction<CourseType>>;
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [ liveShow ] = allShows;
  const [ dramaCourse ] = allCourses;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginned, setIsLoginned] = useState(false);
  const [userState, setUserState] = useState(user);
  const [modalsOpen, setModalIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ShowType>(liveShow);
  const [courseInfo, setCourseInfo] = useState<CourseType>(dramaCourse);
  const [courseModal, setCourseModal] = useState(false);

  useEffect(() => {
    if (modalsOpen || isOpen || courseModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [modalsOpen, isOpen, courseModal]);

  return (
    <AppContext.Provider
      value={{
        userState,
        setUserState,
        isLoginned,
        setIsLoginned,
        isOpen,
        setIsOpen,
        modalInfo,
        setModalInfo,
        modalsOpen,
        setModalIsOpen,
        setCourseModal,
        courseModal,
        courseInfo,
        setCourseInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
