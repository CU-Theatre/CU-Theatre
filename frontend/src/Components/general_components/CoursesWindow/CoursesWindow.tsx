import React from 'react';
import './CoursesWindow.scss';
import classNames from 'classnames';
import { useAppContext } from '../../../AppContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { WindowSwiper } from '../ModalWindowSwiper';
import { CourseRoadmap } from './courseRodmap';

export const CoursesWindow: React.FC = () => {
  const courseFor = [
    'seek to express through movement.',
    'dance with their soul.',
    'find magic in every performance.',
    'wish to bring stories to life.',
    'communicate through the art of dance.',
    'live to perform on stage.',
    'breathe through expression.',
  ];

  const { courseModal, courseInfo: course, setCourseModal } = useAppContext();

  const onCLoseWindow = () => {
    setCourseModal(false);
  };

  return (
    <div className={classNames("course-window", { "modal-open": !courseModal })}>
      <div className='course-window__container'>
        <div className='course-window__about'>
          <div className="course-window__top">
            <button 
              onClick={onCLoseWindow} 
              type='button' 
              className='course-window__close'></button>
            <h2 className='course-window__title title'>{course.courseName}</h2>
          </div>
          <div className='course-window__image-for'>
            <div className="course-window__for">
              <p className='course-window__subtitle'> This course for those who </p>
              <Swiper 
                modules={[Autoplay]}
                className='course-window__quotes'
                autoplay={{
                  delay: 5000,
                }}
                allowTouchMove={false}
                direction="vertical"
                loop={true}
              >
                {courseFor.map(quote => (
                  <SwiperSlide
                    className='course-window__quote' 
                    key={quote}
                    >
                      {quote}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <img className='course-window__image' src={course.courseBackground} alt="groupPhoto" />
          </div>
        </div>
        <div className='course-window__benefits'>
          <h3 className='course-window__headline'>You can improve</h3>
          <WindowSwiper /> 
        </div>
        <div className='course-window__info'>
          <h2 className='course-window__headline course-window__headline--how'>How the course works</h2>
          <CourseRoadmap course={course} />
        </div>
      </div>
    </div>
  );
};