import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";

export const App: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
