import React from "react";
import "./App.scss";
import "./reset.css"
import { Outlet } from "react-router-dom";
import { Header } from "./Components/header/Header";
import { Footer } from "./Components/Footer";


export const App: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
