/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, NavLink } from "react-router-dom";
import styles from "./header.module.scss";

export const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header__container}>
                <Link to={'#'} className={styles.header__logo}></Link>
                <nav className={styles.header__navigation}>
                    <ul className={styles.header__list}>
                        <li className={`${styles.header__item} nav-isActive`}>
                            <NavLink to={'#'} className="header__link">Home</NavLink>
                        </li>
                        <li className={styles.header__item}>
                            <NavLink to={'#'} className="header__link">About us</NavLink>
                        </li>
                        <li className={styles.header__item}>
                            <NavLink to={'#'} className="header__link">Timetable</NavLink>
                        </li>
                        <li className={styles.header__item}>
                            <NavLink to={'#'} className="header__link">Contact</NavLink>
                        </li>
                    </ul>
                    <nav className={styles.header__icons}>
                        <a href="#" className={`${styles.header__icon} ${styles['header__icon--inst']}`}></a>
                        <a href="#" className={`${styles.header__icon} ${styles['header__icon--facebook']}`}></a>
                    </nav>
                </nav>
                <nav className={styles.header__buttons}>
                    <button className={`${styles.header__button} ${styles['header__button--book']} white-button`}>Book place</button>
                    <Link to={'#'} className={`${styles.header__button} ${styles['header__button--log']} white-button`}>Log in</Link>
                    <Link to={'#'} className={`${styles.header__icon} ${styles['header__icon--burger']}`}></Link>
                </nav>
            </div>
        </div>
    );
};