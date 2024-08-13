import { Swiper, SwiperSlide } from "swiper/react";
import someImage from "../../../img/homePageAbout/whoWe.png";
import "swiper/css";
import styles from "./ReviewsSwiper.module.scss";
import { DESKTOP_MIN_WIDTH, GRID_GAP_DESK, TABLE_MIN_WIDTH } from "../../../../utils/globalVariables";

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
            <button className={styles["swiper__button"]}>
              Choose your class
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
