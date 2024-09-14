import React from "react";
import "./SignButton.scss";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  path?: string;
}

export const SignButton: React.FC<Props> = ({ title, path }) => {
  let currantPath =
    path ? path : title.toLowerCase().includes("course") ? "/our-courses" : "";

  return (
      <Link to={currantPath} className="sign-button">
        {title}
      </Link>
  );
};
