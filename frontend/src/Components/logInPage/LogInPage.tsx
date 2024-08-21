import React from "react";
import { LogInForm } from "./logInForm";
import './LogInPage.scss';



export const LogInPage: React.FC = () => {
  return (
    <>
      <main className="log-in">
        <div className="log-in__container">
          <LogInForm />
        </div>
      </main>
    </>
  );
};
