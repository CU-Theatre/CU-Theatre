import React from "react";
import "./ButtonCross.scss";

type Props = {
  onClick: () => void;
};

export const ButtonCross: React.FC<Props> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className="button-cross">cross</button>
  );
};
