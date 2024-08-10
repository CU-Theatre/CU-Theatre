import React from "react";
import style from "./About.module.scss";
import { Discover } from "../../Components/Discover";

export const About: React.FC = () => {
  return (
    <main className={style.about}>
      <Discover />
    </main>
  );
};
