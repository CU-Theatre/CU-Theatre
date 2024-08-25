/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { pages } from "../../../utils/pagesArray";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import "./BurgerMenu.scss";
import classNames from "classnames";
import { useAppContext } from "../../../AppContext";
import happyMask from "./img/happy.png";
import sadMask from "./img/sadMask.png";

export const BurgerMenu: React.FC = () => {
  const { isOpen, setIsOpen, isLoginned } = useAppContext();
  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <section className={classNames("burger-menu", { "menu-open": !isOpen })}>
      <div className="burger-menu__container">
        <div className="burger-menu__header">
          <Link
            to={"/"}
            onClick={handleCloseMenu}
            className="burger-menu__logo"
          ></Link>
          <button
            type="button"
            onClick={handleCloseMenu}
            className="burger-menu__icon burger-menu__icon--close"
          ></button>
        </div>
        <img
          className="burger-menu__image burger-menu__image--sad"
          src={sadMask}
          alt=""
        />
        <nav className="burger-menu__navigation">
          <ul className="burger-menu__list burger-menu__list--pages">
            {pages.map((page) => (
              <li key={page.page} className="burger-menu__item">
                <NavLink
                  onClick={handleCloseMenu}
                  to={page.link}
                  className={({ isActive }) =>
                    cn("burger-menu__link", { "nav-isActive": isActive })
                  }
                >
                  {page.page}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="burger-menu__list burger-menu__list--icons">
            <li className="burger-menu__item">
              <a
                href="https://www.instagram.com/cu.theater?igsh=MWpyNGY2ejF6bGhmMQ=="
                className="burger-menu__icon burger-menu__icon--inst"
              ></a>
            </li>
            <li className="burger-manu__item">
              <a
                href="#"
                className="burger-menu__icon burger-menu__icon--facebook"
              ></a>
            </li>
            {isLoginned && (
              <li className="header__item">
                <NavLink
                  to={"/your-account"}
                  className={({ isActive }) =>
                    cn("header__icon header__icon--cabinet", {
                      "nav-isActive": isActive,
                    })
                  }
                ></NavLink>
              </li>
            )}
          </ul>

          {!isLoginned && (
            <Link
              to={{
                pathname: "/log-in",
                search: "control=LogIn",
              }}
              className="burger-menu__button white-button"
              onClick={handleCloseMenu}
            >
              Log in
            </Link>
          )}
        </nav>
        <img
          className="burger-menu__image burger-menu__image--happy"
          src={happyMask}
          alt=""
        />
      </div>
    </section>
  );
};
