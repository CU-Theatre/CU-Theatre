import React from "react";
import "./App.scss";
import "./reset.css"
import { Outlet } from "react-router-dom";
import { Header } from "./components/header/Header";
import { HomePage } from "./components/homePage/HomePage";

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <HomePage />
      <Outlet />
    </>
  );
};
