import React, { createContext, useContext, useState } from "react";

interface AppContextInterface {
  isOpen: boolean;
  setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppContext.Provider 
      value={{
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