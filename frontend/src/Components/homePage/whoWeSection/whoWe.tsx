import React from "react";
import explore from '../../img/homePageAbout/Explore.png';
import whoWeAre from '../../img/homePageAbout/whoWe.png';
import { SignButton } from "../../general_components/signButton";
import './WhoWe.scss';
import { useFadeIn } from "../../../hooks/useFadeIn";

export const WhoWe: React.FC = () => {
  const [ref, isVisible] = useFadeIn();

  return (
    <section className="home__whoWe whoWe">
      <div ref={ref} className={`whoWe__container ${isVisible ? 'block-visible' : ''}`}>
        <img className="whoWe__explore" src={explore} alt="explore, express, excell" />
        <h2 className="whoWe__title title">Who We Are</h2>
        <div className="whoWe__content">
          <img className="whoWe__image" src={whoWeAre} alt="who we are" />
          <p className="whoWe__text">
            We are the modern theatre that is more than just a place for performances, 
            it is a thriving community where creativity flourishes, aspirations are realized and personal development is at the forefront. 
            We place 
            a strong emphasis on providing a personalized approach, ensuring that each visitor receives personalized guidance and support.
          </p>
        </div>
        <SignButton title="More classes" />
      </div>
    </section>
  );
};