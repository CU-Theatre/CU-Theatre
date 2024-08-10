import React from "react";
import "./App.scss";
import "./reset.css"
import { Outlet } from "react-router-dom";
import { Header } from "./components/header/Header";

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
