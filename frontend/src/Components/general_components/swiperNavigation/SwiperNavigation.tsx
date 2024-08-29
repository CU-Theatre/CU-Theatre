import React from "react";
import { useSwiper } from "swiper/react";
import "./SwiperNavigation.scss";

export const SwiperNavigation: React.FC = () => {
  const swiper = useSwiper();

  return (
    <div className="swiper-navigation">
      <button
        type="button"
        className="swiper-navigation__button swiper-navigation__button--prev"
        onClick={() => swiper.slidePrev()}
      >
        Slide to the previous slide
      </button>
      <button
        type="button"
        className="swiper-navigation__button swiper-navigation__button--next"
        onClick={() => swiper.slideNext()}
      >
        Slide to the next slide
      </button>
    </div>
  );
};
