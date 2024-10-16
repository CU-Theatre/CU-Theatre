import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "./types/User";
import { ShowType } from "./types/ShowType";
import { allShows } from "./utils/allShows";
import { KEY_TOKEN } from "./utils/globalVariables";
import { getCurrentUser } from "./api/userApi";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { FetchErrorMessage } from "./types/FetchErrorMessage";
import { allCourses } from "./utils/courses";
import { CourseType } from "./types/CourseType";
import { CourseEvent } from "./types/CourseEvent";
import { allClasses } from "./utils/allClasses";
import { Events } from "./types/Events";
import { events } from "./utils/events";

interface AppContextInterface {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginned: boolean;
  setIsLoginned: React.Dispatch<React.SetStateAction<boolean>>;
  userState: User | null;
  setUserState: React.Dispatch<React.SetStateAction<User | null>>;
  modalsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalInfo: ShowType;
  setModalInfo: React.Dispatch<React.SetStateAction<ShowType>>;
  courseModal: boolean;
  setCourseModal: React.Dispatch<React.SetStateAction<boolean>>;
  courseInfo: CourseType;
  setCourseInfo: React.Dispatch<React.SetStateAction<CourseType>>;
  eventInfoIsOpen: boolean;
  setEventInfoIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  courses: CourseEvent[];
  setCourses: React.Dispatch<React.SetStateAction<CourseEvent[]>>;
  eventDetailIsOpen: boolean;
  setEventDetailIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  eventList: Events | undefined;
  setEventList: React.Dispatch<React.SetStateAction<Events | undefined>>;
  currentShows: ShowType[];
  setCurrentShows: React.Dispatch<React.SetStateAction<ShowType[]>>;
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [currentShows, setCurrentShows] = useState<ShowType[]>(allShows);
  const [liveShow] = currentShows;
  const [ dramaCourse ] = allCourses;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginned, setIsLoginned] = useState(false);
  const [userState, setUserState] = useState<User | null>(null);
  const [modalsOpen, setModalIsOpen] = useState(false);
  const [eventDetailIsOpen, setEventDetailIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ShowType>(liveShow);
  const [eventInfoIsOpen, setEventInfoIsOpen] = useState(true);
  const [eventList, setEventList] = useState<Events | undefined>(events);
  const [courses, setCourses] = useState<CourseEvent[] | []>([...allClasses, ...dramaCourse.courseTime ]);

  const [token, setToken] = useLocalStorage(KEY_TOKEN, "");

  useEffect(() => {
    getCurrentUser(token)
      .then((newUser) => {
        setUserState(newUser);
        console.log(token);
        setIsLoginned(true);
      })
      .catch((err: Error) => {
        switch (err.message) {
          case FetchErrorMessage.Unauthorized:
          case FetchErrorMessage.InternalServerError:
            setIsLoginned(false);
            setToken("");
            break;

          default:
            console.error(err);
            // TODO add message Unexpected Error
            break;
        }
      });
  }, []);
  const [courseInfo, setCourseInfo] = useState<CourseType>(dramaCourse);
  const [courseModal, setCourseModal] = useState(false);

  useEffect(() => {
    if (modalsOpen || isOpen || courseModal || eventDetailIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [modalsOpen, isOpen, courseModal, eventDetailIsOpen]);

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
        eventInfoIsOpen,
        setEventInfoIsOpen,
        courses,
        setCourses,
        eventDetailIsOpen,
        setEventDetailIsOpen,
        eventList,
        setEventList,
        currentShows,
        setCurrentShows,
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
