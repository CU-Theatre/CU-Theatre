import React from "react";
import { ShowType } from "../../../types/ShowType";
import { SignButton } from "../signButton";
import './ShowsWindow.scss';
import { useAppContext } from "../../../AppContext";
import classNames from "classnames";

interface Props {
  show: ShowType;
}

export const ShowsWindow: React.FC<Props> = ({ show }) => {
  const { setModalIsOpen, modalsOpen } = useAppContext();

  const onCloseMenu = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={classNames("show", { "modal-open": !modalsOpen })}>
      <div className="show__wrapper">
        <div className="show__top">
          <button onClick={onCloseMenu} type="button" className="show__close"></button>
          <h2 className="show__title title">{show.showName}</h2>
        </div>
        <div className="show__main">
          <img className="show__image" src={show.showImg} alt="showImage" />
          <div className="show__content">
            <p className="show__descr">{show.showTitle}</p>
            <div className="show__info">
              <p className="show__date">Time- {show.showDate}</p>
              <p className="show__price">Price- {show.showPrice}</p>
              <SignButton title="Book a place"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};