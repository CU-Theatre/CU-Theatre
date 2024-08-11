import React from 'react'; 
import './Welcome.scss';
import { useFadeIn } from '../../../hooks/useFadeIn';

export const Welcome = () => {
  const [ref, isVisible] = useFadeIn();

  return (
    <div className='home__welcome welcome'>
      <div ref={ref} className={`welcome__container ${isVisible ? 'block-visible' : ''}`}>
        <div className='welcome__content'>
          <h1 className='welcome__title'>Welcome to  CU Theater</h1>
          <p className='welcome__subtitle'>
            Discover the Unexpected: <br />
            Where Dublin Laughs, Heals and Rises
          </p>
        </div>
        <button className='welcome__button white-button'>Learn more</button>
      </div>
    </div>
  );
};