import React from "react";
import "./Biography.scss";
import directorImg from "../../img/aboutPage/our_director_&_founder_deck.webp";
import { SignButton } from "../../general_components/signButton";
import { useFadeIn } from "../../../hooks/useFadeIn";

export const Biography: React.FC = () => {
  const [ref, isVisible] = useFadeIn();

  return (
    <section className="biography">
      <div 
        ref={ref}
        className={`biography__container ${isVisible ? "block-visible" : ""}`}
      >
        <h2 className="biography__title title">our director & founder</h2>
        <div className="biography__img">
          <img src={directorImg} alt="Elena, our director & founder" />
        </div>
        <div className="biography__text-container">
          <h3 className="biography__name">Elina CU</h3>
          <p className="biography__text">
            Director, actor, choreographer. Has been a theatre actor for 10
            years. Wrote her own drama, improvisation and playback courses for
            beginners and those who already has some experience. Elina was a
            co-organizer, director and actor at Play readings for Ukraine 2022,
            2023; Swords Family Day 2022; Stus Fest 2024 and organized a rally
            in support of Ukraine in January 2024. She is a co-founder and an
            Academic events officer in TCD Ukrainian society. Elina became a
            World Champion of Pole Dance (2020). Has aerial sports students who
            became champions of Ukraine. She is currently studying in Trinity on
            Film studies. Makes her own short films, directs and acts in Europe
            most active drama society DuPlayers
          </p>
        </div>

        <SignButton title="Sign for a course" path="/our-courses"/>
      </div>
    </section>
  );
};
