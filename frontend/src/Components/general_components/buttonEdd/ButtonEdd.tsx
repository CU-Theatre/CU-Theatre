import React from "react";
import './ButtonEdd.scss'

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const ButtonEdd: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="button-edd"
      onClick={onClick}
    >
      +
    </button>
  );
};
