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
  import { Events } from "./types/Events";
  import { events } from "./utils/events";
import { getEmergencyContact } from "./api/emergency-contactApi";
import { EmergencyContactType } from "./types/EmergencyContactType";
import { getAllClasses } from "./api/classesApi";
import { ClassesAPI } from "./types/ClassesAPI";

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
    currUserEmergency: EmergencyContactType | null | undefined;
    setCurrUserEmergency: React.Dispatch<React.SetStateAction<EmergencyContactType | null | undefined>>;
    contactPageLoader: boolean;
    setContactPageLoader: React.Dispatch<React.SetStateAction<boolean>>;
    timetablePageLoader: boolean;
    setTimetablePageLoader: React.Dispatch<React.SetStateAction<boolean>>;
    editingEvent: boolean;
    setEditingEvent: React.Dispatch<React.SetStateAction<boolean>>;
    editingEventId: number;
    setEditingEventId: React.Dispatch<React.SetStateAction<number>>;
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
    const [courses, setCourses] = useState<CourseEvent[] | []>([...dramaCourse.courseTime ]);
    const [currUserEmergency, setCurrUserEmergency] = useState<EmergencyContactType | null | undefined>();
    const [contactPageLoader, setContactPageLoader] = useState(false);
    const [timetablePageLoader, setTimetablePageLoader] = useState(false);
    const [editingEvent, setEditingEvent] = useState(false);
    const [editingEventId, setEditingEventId] = useState<number>(0);

    const [token, setToken] = useLocalStorage(KEY_TOKEN, "");

    useEffect(() => {
      setTimetablePageLoader(true);
      const fetchClasses = async () => {
        try {
          const response = await getAllClasses(token);
          const transformedClasses = (response as ClassesAPI[]).map((course: any) => ({
            id: course.id,
            title: course.title,
            start: new Date(course.start),
            end: new Date(course.end),
            description: course.description || "",
            icon: course.icon || "",
            rule: {
              freq: course.freq || 'WEEKLY',
              interval: course.interval || 1,
              day: course.days.length > 0 ? course.days.map((day: string) => day.slice(0, 2)) : [],
              start: new Date(course.start).toString(),
              finish: new Date(course.end).toString(),
            },
          }));

          const newCLasses = [...transformedClasses, ...dramaCourse.courseTime]
  
          setCourses(newCLasses);
        } catch (error) {
          console.error('Error fetching classes:', error);
        }
      };
  
      fetchClasses()
      .finally(() => setTimetablePageLoader(false));
    }, [token]);
    
    useEffect(() => {
      setContactPageLoader(true);

      getCurrentUser(token)
        .then((newUser) => {
          setUserState(newUser);
          setIsLoginned(true);
          getEmergencyContact(newUser.id, token)
            .then((currUser) => {
              setCurrUserEmergency(currUser);
            })
            .catch(err => {
              console.log('failed to load currUser', err);
            });
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
        })
        .finally(() => setContactPageLoader(false));
    }, [token]);

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
          currUserEmergency,
          setCurrUserEmergency,
          contactPageLoader,
          setContactPageLoader,
          timetablePageLoader,
          setTimetablePageLoader,
          editingEvent,
          setEditingEvent,
          editingEventId,
          setEditingEventId,
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
