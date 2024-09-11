import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./WindowSwiper.module.scss";
import { Navigation, Autoplay } from "swiper/modules";

const loadImage = (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    img.onerror = reject;
  });
};

export const WindowSwiper: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: string }>(
    {}
  );

  const slides = useMemo(
    () => [
      {
        slideTitle: "Effective communication",
        slideImg: require("./img/effectiveC.png"),
        slideText: "Sharpen your ability to express ideas clearly",
      },
      {
        slideTitle: "Public Speaking",
        slideImg: require("./img/publicSp.png"),
        slideText: "Get a beautiful, deep, strong voice.",
      },
      {
        slideTitle: "Body Language Mastery",
        slideImg: require("./img/bodyLang.png"),
        slideText: "Decode nonverbal cues and enhance connections.",
      },
      {
        slideTitle: "Plasticity",
        slideImg: require("./img/plasticity.png"),
        slideText: "Become more confident in your body",
      },
      {
        slideTitle: "Get on the stage",
        slideImg: require("./img/getOnStage.png"),
        slideText: "You can act in a show, short film or a play!",
      },
      {
        slideTitle: "Quick and creative thinking",
        slideImg: require("./img/thinking.png"),
        slideText: "Learn, pass the exam and get a role in a new show!",
      },
    ],
    []
  );

  useEffect(() => {
    slides.forEach((slide) => {
      loadImage(slide.slideImg).then((src) => {
        setLoadedImages((prev) => ({ ...prev, [slide.slideTitle]: src }));
      });
    });
  }, [slides]);

  return (
    <div className={styles["window-slider"]}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: ".slider-button--next",
          prevEl: ".slider-button--prev",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 5000,
        }}
        loop={true}
      >
        {slides.map((slide) => (
          <SwiperSlide
            className={styles["window-slider__slide"]}
            key={slide.slideTitle}
          >
            <h4 className={styles["window-slider__title"]}>
              {slide.slideTitle}
            </h4>
            <div className={styles["window-slider__content"]}>
              <img
                className={styles["window-slider__image"]}
                src={loadedImages[slide.slideTitle]}
                alt={slide.slideTitle}
              />
              <p className={styles["window-slider__text"]}>{slide.slideText}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles["window-slider__buttons"]}>
        <button
          type="button"
          className="slider-button slider-button--prev"
        ></button>
        <button
          type="button"
          className="slider-button slider-button--next"
        ></button>
      </div>
    </div>
  );
};
