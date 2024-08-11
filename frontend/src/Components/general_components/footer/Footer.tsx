import React from "react";
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <div className='footer__content'>
          <div className='footer__location'>
            <h3 className='footer__title'>Location</h3>
            <a
              className='footer__link'
              href="https://maps.app.goo.gl/8xqPXXouaUgFtgxTA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>11 William Street S, Dublin, County Dublin D02 N727, IE</div>
            </a>
          </div>

          <div className='footer__hours'>
            <h3 className='footer__title'>Hours</h3>
            <ul className='footer__list'>{/* add work hours */}</ul>
          </div>

          <div className='footer__contacts'>
            <h3 className='footer__title'>Contact</h3>
            <ul className='footer__list'>
              <li className='footer__item'>
                <a
                  href="mailto:"
                  target="_blank"
                  rel="noreferrer"
                  className='footer__link'
                >
                  <div>Email</div>
                </a>
              </li>
              <li className='footer__item'>
                <a
                  href="tel:+"
                  target="_blank"
                  rel="noreferrer"
                  className='footer__link'
                >
                  <div>Tel</div>
                </a>
              </li>
            </ul>
          </div>

          <div className='footer__sadMask' />
          <div className='footer__smilingMask' />
        </div>
      </div>
    </footer>
  );
};
