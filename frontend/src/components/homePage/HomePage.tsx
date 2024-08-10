import React from 'react'; 
import { Welcome } from './welcomeSection/Welcome';
import { About } from './aboutSection';
import  './HomePage.scss';

export const HomePage = () => {
  return (
    <div className='home'>
        <Welcome />
        <About />
    </div>
  );
};