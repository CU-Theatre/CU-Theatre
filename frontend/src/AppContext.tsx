import React, { createContext, useContext, useState } from "react";
import { user } from "./utils/user";
import { User } from "./types/User";

interface AppContextInterface {
  isOpen: boolean;
  setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>;
  isLoginned: boolean;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginned] = useState(true);
  const [userState, setUserState] = useState(user);

  return (
    <AppContext.Provider 
      value={{
        userState,
        setUserState,
        isLoginned,
        isOpen,
        setIsOpen,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};