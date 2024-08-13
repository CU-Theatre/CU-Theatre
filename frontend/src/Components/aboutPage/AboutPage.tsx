import React from "react";
import "./AboutPage.scss";
import { Discover } from "./discover";
import { Biography } from "./biography";
import { MoreClasses } from "./moreClasses";
import { WhatYouGet } from "./whatYouGet";

export const AboutPage: React.FC = () => {
  return (
    <main className='about-page'>
      <Discover />
      <Biography />
      <MoreClasses />
      <WhatYouGet />
    </main>
  );
};
