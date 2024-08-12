import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import style from "./MoreClasses.module.scss";

import imgHeals from "../../img/aboutPageSlider/heals.webp";
import imgExotic from "../../img/aboutPageSlider/Exotic.webp";
import imgTwerk from "../../img/aboutPageSlider/Twerk.webp";
import imgStretching from "../../img/aboutPageSlider/Stretching.webp";
import {
  DESKTOP_MIN_WIDTH,
  GRID_GAP_DESK,
  GRID_GAP_MOB,
  TABLE_MIN_WIDTH,
} from "../../../utils/globalVariables";

const classesArr = [
  {
    title: "Heels",
    img: imgHeals,
  },
  {
    title: "Exotic",
    img: imgExotic,
  },
  {
    title: "Twerk",
    img: imgTwerk,
  },
  {
    title: "Stretching",
    img: imgStretching,
  },
];

const getSliderParams = () => {
  const viewportWidth = window.innerWidth;

  let slidesPerView = 1;
  let spaceBetween = GRID_GAP_MOB;

  if (viewportWidth >= TABLE_MIN_WIDTH) {
    slidesPerView = 2;
  }

  if (viewportWidth >= DESKTOP_MIN_WIDTH) {
    slidesPerView = 2.5;
    spaceBetween = GRID_GAP_DESK;
  }

  return [slidesPerView, spaceBetween];
};

export const MoreClasses: React.FC = () => {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [spaceBetween, setSpaceBetween] = useState(20);

  const changeSliderParams = (newParams: number[]) => {
    const oldParams = [slidesPerView, spaceBetween];
    if (JSON.stringify(newParams) !== JSON.stringify(oldParams)) {
      setSlidesPerView(newParams[0]);
      setSpaceBetween(newParams[1]);
    }
  };

  const handlerResize = () => {
    const newParams = getSliderParams();
    changeSliderParams(newParams)
  }

  useEffect(() => {
    handlerResize()

    window.addEventListener("resize", handlerResize);

    return () => {
      window.removeEventListener("resize", handlerResize);
    };
  }, []); //eslint-disable-line

  return (
    <section className={style.classes}>
      <div className={style.classes__container}>
        <h2 className={`${style.classes__title} title`}>
          More classes from our director & founder
        </h2>

        <div className={style.classes__slider}>
          <Swiper slidesPerView={slidesPerView} spaceBetween={spaceBetween}>
            {classesArr.map((training, i) => (
              <SwiperSlide
                className={`${style.classes__slide} ${
                  i % 2 === 0 || style["classes__slide--black"]
                }`}
                key={training.title}
              >
                <h3 className={style["classes__slide-title"]}>
                  {training.title}
                </h3>
                <img
                  src={training.img}
                  alt={`from ${training.title}`}
                  className={style.classes__img}
                />
                <button
                  type="button"
                  className={`${style.classes__button} ${
                    i % 2 === 0 || style["classes__button--white"]
                  }`}
                >
                  Sign for a class
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
