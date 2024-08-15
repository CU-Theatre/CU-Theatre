import React from "react";
import 'video-react/dist/video-react.css';
import './Reviews.scss';
import { ReviewsSwiper } from "./swiper";
import { useFadeIn } from "../../../hooks/useFadeIn";

export const Reviews: React.FC = () => {
  const [ref, isVisible] = useFadeIn();

  return (
    <section className="home__reviews reviews">
      <div ref={ref} className={`reviews__container ${isVisible ? 'block-visible' : ''}`}>
        <h2 className="reviews__title title">Heartfelt Words from Our Audience</h2>
        <div className="reviews__content">
          <ReviewsSwiper />
        </div>
      </div>
    </section>
  );
};