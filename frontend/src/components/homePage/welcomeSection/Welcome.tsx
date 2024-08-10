import React from 'react'; 
import './Welcome.scss';

export const Welcome = () => {
  return (
    <div className='home__welcome welcome'>
      <div className='welcome__container'>
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