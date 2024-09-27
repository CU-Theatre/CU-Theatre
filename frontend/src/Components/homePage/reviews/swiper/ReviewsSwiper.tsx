import { Swiper, SwiperSlide } from "swiper/react";
import someImage from "../../../img/homePageAbout/whoWe.png";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import styles from "./ReviewsSwiper.module.scss";
import {
  DELAY_SWIPER_AUTOPLAY,
  DESKTOP_MIN_WIDTH,
  GRID_GAP_DESK,
  TABLE_MIN_WIDTH,
} from "../../../../utils/globalVariables";
import { SwiperNavigation } from "../../../general_components/swiperNavigation";
import { Link } from "react-router-dom";

export const ReviewsSwiper = () => {
  const reviews = [
    {
      id: 1,
      author: "Kate",
      quote: "This course gave me wings!",
    },
    {
      id: 2,
      author: "Kate",
      quote: "This course gave me wings!",
    },
    {
      id: 3,
      author: "Kate",
      quote: "This course gave me wings!",
    },
    {
      id: 4,
      author: "Kate",
      quote: "This course gave me wings!",
    },
  ];

  return (
    <>
      <Swiper
        className={styles.swiper}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          [TABLE_MIN_WIDTH]: {
            slidesPerView: 2,
          },
          [DESKTOP_MIN_WIDTH]: {
            slidesPerView: 3,
            spaceBetween: GRID_GAP_DESK,
          },
        }}
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: DELAY_SWIPER_AUTOPLAY,
        }}
      >
        {reviews.map((review) => (
          <SwiperSlide
            key={review.id}
            className={styles["swiper__reviews-slide"]}
          >
            <img className={styles.swiper__video} src={someImage} alt="" />
            <div className={styles["swiper__content"]}>
              <h3 className={styles["swiper__title"]}>{review.author}</h3>
              <p className={styles["swiper__text"]}>{review.quote}</p>
              <Link to={'/classes'} className={styles["swiper__button"]}>
                Choose your class
              </Link>
            </div>
          </SwiperSlide>
        ))}

        <SwiperNavigation />
      </Swiper>
    </>
  );
};
