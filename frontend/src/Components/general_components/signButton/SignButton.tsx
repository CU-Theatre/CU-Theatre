import  React from "react";
import './SignButton.scss';

interface Props {
  title: string;
}

export const SignButton: React.FC<Props> = ({ title }) => {
  return (
    <button className="sign-button">{title}</button>
  );
};