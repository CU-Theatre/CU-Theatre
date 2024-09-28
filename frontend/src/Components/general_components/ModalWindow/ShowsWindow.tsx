import React, { useEffect } from "react";
import { ShowType } from "../../../types/ShowType";
import "./ShowsWindow.scss";
import { useAppContext } from "../../../AppContext";
import classNames from "classnames";
import { BookingButton } from "../bookingButton";

interface Props {
  show: ShowType;
}

export const ShowsWindow: React.FC<Props> = ({ show }) => {
  const { setModalIsOpen, modalsOpen, eventList } = useAppContext();

  const onCloseMenu = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    return () => {
      setModalIsOpen(false);
    };
  }, [setModalIsOpen]);

  const detectShow = (someShowName: string) => {
    if (!eventList?.mainEvents) return;

    let chosedShow;

    switch (someShowName) {
      case 'Live performance':
        chosedShow = eventList.mainEvents.livePerf;
        break;
      case 'Impro shows':
        chosedShow = eventList.mainEvents.impro;
        break;
      default:
        chosedShow = eventList.mainEvents.playback;
        break;
    }

    return chosedShow;
  };

  const countTicketsLeft = (someShowName: string) => {
    const lookingShow = detectShow(someShowName);

    if (!lookingShow) return;

    return 30 - lookingShow?.length;
  }

  return (
    <div className={classNames("show", { "modal-open": !modalsOpen })}>
      <div className="show__wrapper">
        <div className="show__top">
          <button
            onClick={onCloseMenu}
            type="button"
            className="show__close"
          ></button>
          <h2 className="show__title title">{show.showName}</h2>
        </div>
        <div className="show__main">
          <img className="show__image" src={show.showImg} alt="showImage" />
          <div className="show__content">
            <p className="show__descr">{show.showTitle}</p>
            <div className="show__info">
              <p className="show__date">Time- {show.showDate}</p>
              <p className="show__price">Price- {show.showPrice}</p>
              {countTicketsLeft(show.showName) === 0 ? (
                <p className="show__tickets-left show__error">There are no tickets left 😢</p>
              ) : (
                <p className="show__tickets-left">Tickets left - {countTicketsLeft(show.showName)}</p>
              )}
              {countTicketsLeft(show.showName) !== 0 && (
                <BookingButton title="Book a place" show={show} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
