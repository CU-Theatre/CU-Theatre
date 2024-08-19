import React from "react";
import "./SignButton.scss";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  path?: string;
}

export const SignButton: React.FC<Props> = ({ title, path }) => {
  let currantPath =
    path || title.toLowerCase().includes("course") ? "/our-courses" : "";

  return (
    <div className="sign-button">
      <Link to={currantPath} className="sign-button__link">
        {title}
      </Link>
    </div>
  );
};
