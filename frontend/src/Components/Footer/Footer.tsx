import React from "react";
import style from "./Footer.module.scss";
import container from "../../styles/container.module.scss";

export const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className={container.container}>
        <div className={style.footer__content}>
          <div className={style.footer__location}>
            <h3 className={style.footer__title}>Location</h3>
            <a
              className={style.footer__link}
              href="https://maps.app.goo.gl/8xqPXXouaUgFtgxTA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>11 William Street S, Dublin, County Dublin D02 N727, IE</div>
            </a>
          </div>

          <div className={style.footer__hours}>
            <h3 className={style.footer__title}>Hours</h3>
            <ul className={style.footer__list}>{/* add work hours */}</ul>
          </div>

          <div className={style.footer__contacts}>
            <h3 className={style.footer__title}>Contact</h3>
            <ul className={style.footer__list}>
              <li className={style.footer__item}>
                <a
                  href="mailto:"
                  target="_blank"
                  rel="noreferrer"
                  className={style.footer__link}
                >
                  <div>Email</div>
                </a>
              </li>
              <li className={style.footer__item}>
                <a
                  href="tel:+"
                  target="_blank"
                  rel="noreferrer"
                  className={style.footer__link}
                >
                  <div>Tel</div>
                </a>
              </li>
            </ul>
          </div>

          <div className={style.footer__sadMask} />
          <div className={style.footer__smilingMask} />
        </div>
      </div>
    </footer>
  );
};
