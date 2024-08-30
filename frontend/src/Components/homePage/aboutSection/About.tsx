import React from "react";
import mainImage from "../../img/homePageAbout/about.png";
import explore from "../../img/homePageAbout/Explore.png";
import "../../../styles/variables.scss";
import "./About.scss";
import { Link } from "react-router-dom";
import { SignButton } from "../../general_components/signButton";
import { useFadeIn } from "../../../hooks/useFadeIn";
import { ShowsWindow } from "../../general_components/ModalWindow/ShowsWindow";
import { useAppContext } from "../../../AppContext";
import { allShows } from "../../../utils/allShows";
import { allCourses } from "../../../utils/courses";
import { ShowType } from "../../../types/ShowType";

export const About: React.FC = () => {
  const [dramaCourse] = allCourses;

  const [ref, isVisible] = useFadeIn();
  const { modalInfo, setModalIsOpen, setModalInfo } = useAppContext();

  const openModalWindow = (show: ShowType) => {
    setModalInfo(show);
    setModalIsOpen(true);
  };

  return (
    <section className="home__about about">
      <div
        ref={ref}
        className={`about__container ${isVisible ? "block-visible" : ""}`}
      >
        <img
          className="about__explore"
          src={explore}
          alt="explore, express, excell"
        />
        <h2 className="about__title title">What we do</h2>
        <div className="about__main">
          <img className="about__image" src={mainImage} alt="about-photo" />
          <div className="about__content">
            {allShows.map((block, index) => (
              <button
                type="button"
                className={`about__block about__block--${index}`}
                key={block.showName}
                onClick={() => openModalWindow(block)}
              >
                <h1 className="about__block-title">{block.showName}</h1>
                <p className="about__block-subtitle">{block.showTitle}</p>
              </button>
            ))}
            <Link
              to={"./our-courses"}
              className={`about__block about__block--3`}
              key={dramaCourse.courseName}
            >
              <h1 className="about__block-title">Drama courses</h1>
              <p className="about__block-subtitle">
                Develop your personality, improve your confidence, communication
                and creative thinking!
              </p>
            </Link>
          </div>
          <SignButton title="Sign for a class" />
        </div>
      </div>
      <ShowsWindow show={modalInfo} />
    </section>
  );
};
