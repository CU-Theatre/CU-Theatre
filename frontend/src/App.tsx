import React from "react";
import "./App.scss";
import "./reset.css"
import { Outlet } from "react-router-dom";
import { Header } from "./Components/general_components/header/Header";
import { Footer } from "./Components/general_components/footer";
import { BurgerMenu } from "./Components/general_components/burgerMenu";


export const App: React.FC = () => {
  return (
    <>
      <Header />
      <BurgerMenu />
      <Outlet />
      <Footer />
    </>
  );
};
