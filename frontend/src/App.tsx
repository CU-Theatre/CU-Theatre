import React from "react";
import "./App.scss";
import { Outlet } from "react-router-dom";
import { Footer } from "./Components/Footer";

export const App: React.FC = () => {
  return (
    <>
      <Outlet />

      <Footer />
    </>
  );
};
