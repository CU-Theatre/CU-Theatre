import React from "react";
import "./AboutPage.scss";
import { Discover } from "./discover";
import { Biography } from "./biography";

export const AboutPage: React.FC = () => {
  return (
    <main className='about-page'>
      <Discover />
      <Biography />
    </main>
  );
};
