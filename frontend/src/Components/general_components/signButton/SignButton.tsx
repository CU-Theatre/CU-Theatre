import React from "react";
import "./SignButton.scss";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  path: string;
}

export const SignButton: React.FC<Props> = ({ title, path }) => {
  return (
      <Link
        to={path}
        type="button" 
        className="sign-button"
        >
        {title}
      </Link>
  );
};
