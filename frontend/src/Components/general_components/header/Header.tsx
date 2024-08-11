import React from 'react'; 
import { Link, NavLink } from "react-router-dom";
import './header.scss';
import cn from 'classnames';

export const Header = () => {
  const pages = [
    {
      page: 'Home',
      link: '/',
    },
    {
      page: 'About us',
      link: '/about',
    },
    {
      page: 'Timetable',
      link: '/timetable',
    },
    {
      page: 'Contact',
      link: '/contact',
    },

  ];

  return (
    <div className='header'>
      <div className='header__container'>
        <Link to={'/'} className='header__logo'></Link>
        <nav className='header__navigation'>
          <ul className='header__list'>
            {pages.map(page => (
              <li key={page.page} className='header__item'>
                <NavLink to={page.link} className={({ isActive }) => cn('header__link', { 'nav-isActive': isActive })}>{page.page}</NavLink>
              </li>
            ))}
          </ul>
          <nav className='header__icons'>
            <a 
              href="https://www.instagram.com/cu.theater?igsh=MWpyNGY2ejF6bGhmMQ==" 
              className='header__icon header__icon--inst'
            >
            </a>
            <a href="#" className='header__icon header__icon--facebook'></a>
          </nav>
        </nav>
        <nav className='header__buttons'>
          <button className='header__button header__button--book white-button'>Book place</button>
          <Link to={'#'} className='header__button header__button--log white-button'>Log in</Link>
          <Link to={'#'} className='header__icon header__icon--burger'></Link>
        </nav>
    </div>
  </div>
  );
};