import React from "react";
import "./Discover.scss";
import { SignButton } from "../../general_components/signButton";
import { useFadeIn } from "../../../hooks/useFadeIn";

export const Discover: React.FC = () => {
  const [ref, isVisible] = useFadeIn();

  return (
    <section className="discover">
      <div
        ref={ref}
        className={`discover__container ${isVisible ? "block-visible" : ""}`}
      >
        <div className="discover__top">
          <div className="discover__sadFace" />
          <div className="discover__smilingFace" />
          <h1 className="discover__title">Discover Us</h1>
        </div>

        <div className="discover__middle">
          <div className="discover__img">
            <img src="./img/discover_desctop.webp" alt="Photos of artists" />
          </div>

          <p className="discover__text">
            We are a theater of the new generation, founded by Elina CU. Our
            goal is to make people think. In the era of social media, our brains
            are bombarded with a lot of information that we don’t have time to
            process, often instantly accepting it as our own. We don’t truly
            listen to our desires, beliefs, and values. Through our
            performances, we aim to pose questions that will make people think
            for days, weeks, or even months. We want to inspire self-reflection,
            help people discover their boundaries—not the ones someone else
            labeled as red flags, but their own. Our second goal is to promote
            Ukrainian culture, which is currently under threat from the Russian
            Federation. We stage plays written by Ukrainian playwrights and
            share stories of Ukrainians. Through playback shows, we strive to
            assist Ukrainians and anyone in need, helping them cope with
            difficult feelings and find understanding and support. We’d be
            delighted to welcome you to our community!
          </p>
        </div>

        <div className="discover__button">
          <SignButton title="Sign for a course" />
        </div>
      </div>
    </section>
  );
};
