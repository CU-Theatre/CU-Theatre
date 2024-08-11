import React from "react";
import { Link } from "react-router-dom";
import './ErrorPage.scss';

export const ErrorPage: React.FC = () => {
  return (
    <main className="error-page">
      This page is not exist. Would you like to go to
      <Link to="/" className="error-page__link">Home Page</Link> ?
    </main>
  );
};
