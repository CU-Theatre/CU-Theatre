import classNames from "classnames";
import React, { useEffect, useState } from "react";
import "./ErrorNotification.scss";

type Props = {
  message: string | undefined;
  setIsError: (p: boolean) => void;
};

export const ErrorNotification: React.FC<Props> = ({
  message,
  setIsError,
}) => {
  const [isErrShown, setIsErrShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsErrShown(true);
    }, 0);

    setTimeout(() => {
      setIsErrShown(false);
    }, 2000);

    setTimeout(() => {
      setIsError(false);
    }, 2500);
  }, []);

  return (
    <article
      className={classNames("error-notification", {
        "error-notification--active": isErrShown,
      })}
    >
      <p className="error-notification__text">{message}</p>
    </article>
  );
};
