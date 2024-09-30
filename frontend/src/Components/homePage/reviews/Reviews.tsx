import React from "react";
import 'video-react/dist/video-react.css';
import './Reviews.scss';
// import { ReviewsSwiper } from "./swiper";
import { useFadeIn } from "../../../hooks/useFadeIn";
import ReactPlayer from 'react-player';

export const Reviews: React.FC = () => {
  const [ref, isVisible] = useFadeIn();
  const videos = ['/video/reviews/IMG_3711.MOV', '/video/reviews/review.mp4'];

  return (
    <section className="home__reviews reviews">
      <div ref={ref} className={`reviews__container ${isVisible ? 'block-visible' : ''}`}>
        <h2 className="reviews__title title">Heartfelt Words from Our Audience</h2>
        <div className="reviews__content">
          {/* <ReviewsSwiper /> */}
          <div className="reviews__react-players" >
            {videos.map(video => (
              <div className="reviews__react-video" key={video}>
                <ReactPlayer 
                  controls={true} 
                  url={video}
                  width='100%'
                  height='100%'
                />
              </div>
            ))}
          </div>
          <div className="reviews__text">
            <div className="reviews__text-review">
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};