import React from 'react'; 
import { Welcome } from './welcomeSection/Welcome';
import { About } from './aboutSection';
import  './HomePage.scss';
import { WhoWe } from './whoWeSection';
import { Reviews } from './reviews';

export const HomePage = () => {
  return (
    <div className='home'>
        <Welcome />
        <About />
        <WhoWe />
        <Reviews />
    </div>
  );
};