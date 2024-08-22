import React, { createContext, useContext, useState } from "react";
import { user } from "./utils/user";
import { User } from "./types/User";
import { ShowType } from "./types/ShowType";
import { allShows } from "./utils/allShows";

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
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [ liveShow ] = allShows;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginned, setIsLoginned] = useState(false);
  const [userState, setUserState] = useState(user);
  const [modalsOpen, setModalIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ShowType>(liveShow);

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
