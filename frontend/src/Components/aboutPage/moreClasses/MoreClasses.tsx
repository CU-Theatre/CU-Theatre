import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import style from "./MoreClasses.module.scss";

import imgHeals from "../../img/aboutPageSlider/heals.webp";
import imgExotic from "../../img/aboutPageSlider/exotic.png";
import imgTwerk from "../../img/aboutPageSlider/Twerk.webp";
import imgStretching from "../../img/aboutPageSlider/Stretching.webp";
import {
  DELAY_SWIPER_AUTOPLAY,
  DESKTOP_MIN_WIDTH,
  GRID_GAP_DESK,
  GRID_GAP_MOB,
  TABLE_MIN_WIDTH,
} from "../../../utils/globalVariables";
import { useFadeIn } from "../../../hooks/useFadeIn";
import { SwiperNavigation } from "../../general_components/swiperNavigation";

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

export const MoreClasses: React.FC = () => {
  const [ref, isVisible] = useFadeIn();

  return (
    <section className={style.classes}>
      <div
        ref={ref}
        className={`${style.classes__container} ${
          isVisible ? "block-visible" : ""
        }`}
      >
        <h2 className={`${style.classes__title} title`}>
          More classes from our director & founder
        </h2>

        <div className={style.classes__slider}>
          <Swiper
            slidesPerView={1}
            spaceBetween={GRID_GAP_MOB}
            breakpoints={{
              [TABLE_MIN_WIDTH]: {
                slidesPerView: 2,
              },
              [DESKTOP_MIN_WIDTH]: {
                slidesPerView: 2.5,
                spaceBetween: GRID_GAP_DESK,
              },
            }}
            modules={[Autoplay]}
            loop={true}
            autoplay={{
              delay: DELAY_SWIPER_AUTOPLAY,
            }}
          >
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

            <SwiperNavigation />
          </Swiper>
        </div>
      </div>
    </section>
  );
};
