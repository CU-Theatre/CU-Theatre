/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.scss";
import cn from "classnames";
import { pages } from "../../../utils/pagesArray";
import { useAppContext } from "../../../AppContext";

export const Header = () => {
  const { setIsOpen, isLoginned } = useAppContext();

  return (
    <header className="header">
      <div className="header__container">
        <Link to={"/"} className="header__logo"></Link>
        <nav className="header__navigation">
          <ul className="header__list">
            {pages.map((page) => (
              <li key={page.page} className="header__item">
                <NavLink
                  to={page.link}
                  className={({ isActive }) =>
                    cn("header__link", { "nav-isActive": isActive })
                  }
                >
                  {page.page}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="header__icons">
            <li className="header__item">
              <a
                href="https://www.instagram.com/cu.theater?igsh=MWpyNGY2ejF6bGhmMQ=="
                className="header__icon header__icon--inst"
                target="_blank"
                rel="noreferrer"
              ></a>
            </li>
            <li className="header__item">
              <a
                href="#"
                className="header__icon header__icon--facebook"
                target="_blank"
                rel="noreferrer"
              ></a>
            </li>
            {isLoginned && (
              <li className="header__item">
                <NavLink
                  to={"./your-account"}
                  className={({ isActive }) =>
                    cn("header__icon header__icon--cabinet", {
                      "nav-isActive": isActive,
                    })
                  }
                ></NavLink>
              </li>
            )}
          </ul>
        </nav>
        <nav className="header__buttons">
          <button
            type="button"
            className="header__button header__button--book white-button"
          >
            Book place
          </button>
          {!isLoginned && (
            <Link
              to={"/log-in"}
              className="header__button header__button--log white-button"
            >
              Log in
            </Link>
          )}
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="header__icon header__icon--burger"
          ></button>
        </nav>
      </div>
    </header>
  );
};
