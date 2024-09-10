import React from "react";
import "./ProgressIndicator.scss";

type Props = {
  progress: number;
};

export const ProgressIndicator: React.FC<Props> = ({ progress }) => {
  return (
    <div className="progress-indicator">
      <p className="progress-indicator__text">{`${progress}%`}</p>
      <div className="progress-indicator__wrapper">
        <div
          className="progress-indicator__line"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
