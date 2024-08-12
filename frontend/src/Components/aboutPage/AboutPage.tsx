import React from "react";
import "./AboutPage.scss";
import { Discover } from "./discover";
import { Biography } from "./biography";
import { MoreClasses } from "./moreClasses";

export const AboutPage: React.FC = () => {
  return (
    <main className='about-page'>
      <Discover />
      <Biography />
      <MoreClasses />
    </main>
  );
};
