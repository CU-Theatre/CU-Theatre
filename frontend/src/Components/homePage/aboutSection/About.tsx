import React from "react";
import mainImage from '../../img/homePageAbout/about.png';
import explore from '../../img/homePageAbout/Explore.png';
import '../../../styles/variables.scss';
import './About.scss';
import { Link } from "react-router-dom";
import { SignButton } from "../../general_components/signButton";

export const About: React.FC = () => {
  const blocks = [
    {
      title: 'Live performances', 
      subtitle: 'Various plays written by Ukrainian authors interpreted and translated by our theater',
      link: '/#dd2d',
    },
    {
      title: 'Impro shows', 
      subtitle: 'Fun, comedy live show where actors don’t have prepared scripts but want to make you laugh.',
      link: '/#dddd',
    },
    {
      title: 'Playback shows', 
      subtitle: 
      'Live show with a healing effect. Audience shares theirs stories, director says a secret word and actors start playing the story focusing on audience’s feelings',
      link: '/#asdasd',
    },
    {
      title: 'Drama courses', 
      subtitle: 
      'Develop your personality, improve your confidence, communication and creative thinking!',
      link: '/#asdasd',
    },
];
  return (
    <div className='home__about about'>
      <div className='about__container'>
        <img className='about__explore' src={explore} alt="explore, express, excell" />
        <h2 className='about__title'>What we do</h2>
        <div className="about__main">
          <img className='about__image' src={mainImage} alt="about-photo"/>
          <div className='about__content'>
            {blocks.map((block, index) => (
              <Link to={block.link} className={`about__block about__block--${index}`} key={block.title}>
                <h1 className="about__block-title">{block.title}</h1>
                <p className="about__block-subtitle">{block.subtitle}</p>
              </Link>
            ))}
          </div>
          <SignButton />
        </div>
      </div>
    </div>
  );
};