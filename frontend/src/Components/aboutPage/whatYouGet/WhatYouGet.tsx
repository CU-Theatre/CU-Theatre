import React from "react";
import style from "./WhatYouGet.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  DELAY_SWIPER_AUTOPLAY,
  GRID_GAP_MOB,
  TABLE_MIN_WIDTH,
} from "../../../utils/globalVariables";
import { useFadeIn } from "../../../hooks/useFadeIn";
import { Autoplay } from "swiper/modules";
import { SwiperNavigation } from "../../general_components/swiperNavigation";

export const WhatYouGet: React.FC = () => {
  const [ref, isVisible] = useFadeIn();

  return (
    <section className={style["what-you-get"]}>
      <div
        ref={ref}
        className={`${style["what-you-get__container"]} ${
          isVisible ? "block-visible" : ""
        }`}
      >
        <h1 className={`${style["what-you-get__title"]} title`}>
          what you will get
        </h1>

        <div className={style["what-you-get__slider"]}>
          <Swiper
            slidesPerView={1}
            spaceBetween={GRID_GAP_MOB}
            breakpoints={{
              [TABLE_MIN_WIDTH]: {
                slidesPerView: 3,
                spaceBetween: GRID_GAP_MOB,
              },
            }}
            modules={[Autoplay]}
            loop={true}
            autoplay={{
              delay: DELAY_SWIPER_AUTOPLAY,
            }}
          >
            <SwiperSlide className={style["what-you-get__slide"]}>
              <p className={style["what-you-get__text"]}>
                <b className={style["what-you-get__text--bold"]}>
                  Say goodbye to back and neck pain!{" "}
                </b>
                Each class starts with a mobility routine. We'll stretch,
                strengthen, Your body ensuring a pain-free experience.
              </p>
            </SwiperSlide>

            <SwiperSlide className={style["what-you-get__slide"]}>
              <p className={style["what-you-get__text"]}>
                <b className={style["what-you-get__text--bold"]}>Flatten</b>{" "}
                your tummy,{" "}
                <b className={style["what-you-get__text--bold"]}>grow</b> gluts
                and <b className={style["what-you-get__text--bold"]}>enhance</b>{" "}
                your orgasms with pelvic floor muscle exercises!
              </p>
            </SwiperSlide>

            <SwiperSlide className={style["what-you-get__slide"]}>
              <p className={style["what-you-get__text"]}>
                <b className={style["what-you-get__text--bold"]}>
                  Fall in Love with Your Body!{" "}
                </b>
                Our classes aren’t just a workout; it's a love affair with your
                curves, and your sensuality.
              </p>
            </SwiperSlide>

            <SwiperSlide className={style["what-you-get__slide"]}>
              <p className={style["what-you-get__text"]}>
                <b className={style["what-you-get__text--bold"]}>
                  Get ready to groove!
                </b>{" "}
                In every dance session, we dive into a sassy 30-second
                choreography.
              </p>
            </SwiperSlide>
            <SwiperNavigation />
          </Swiper>
        </div>
      </div>
    </section>
  );
};
