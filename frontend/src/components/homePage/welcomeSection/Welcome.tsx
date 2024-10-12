import React from 'react'; 
import './Welcome.scss';
import { Link } from 'react-router-dom';

export const Welcome = () => {
  return (
    <section className='home__welcome welcome'>
      <div className='welcome__container'>
        <div className='welcome__content'>
          <h1 className='welcome__title'>Welcome to  CU Theater</h1>
          <p className='welcome__subtitle'>
            Discover the Unexpected: <br />
            Where Dublin Laughs, Heals and Rises
          </p>
        </div>
        <Link to={'/about'} className='welcome__button white-button'>Learn more</Link>
      </div>
    </section>
  );
};