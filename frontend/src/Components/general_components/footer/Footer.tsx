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
            <p className='footer__item'>12:00-19:00</p>
          </div>

          <div className='footer__contacts'>
            <h3 className='footer__title'>Contact</h3>
            <ul className='footer__list'>
              <li className='footer__item'>
                <a
                  href="mailto:herasymchukelina@gmail.com"
                  rel="noreferrer"
                  className='footer__link'
                >
                  <div>Email: herasymchukelina@gmail.com</div>
                </a>
              </li>
              <li className='footer__item'>
                <a
                  href="tel:+350873425121"
                  rel="noreferrer"
                  className='footer__link'
                >
                  <div>Tel: +350873425121</div>
                </a>
              </li>
              <li className='footer__item'>
                <a
                  href="https://www.instagram.com/cu.elina/"
                  target="blank"
                  rel="noreferrer"
                  className='footer__link'
                >
                  <div>Inst: @cu_elina</div>
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
