import classNames from "classnames";
import React, { useState } from "react";
import "./LogInForm.scss";
import { SignUpQuestionnaire } from "../signUpQuestionnaire";
import { LogInQuestionnaire } from "../logInQuestionnaire";

enum Control {
  SignUp = "SignUp",
  LogIn = "LogIn",
}

export const LogInForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<Control>(Control.LogIn);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Control;    
    setSelectedOption(value);
  };

  return (
    <article className="log-in-form">
      <div className="log-in-form__control">
        <label
          className={classNames("log-in-form__radio-btn log-in-form__radio-btn--left", {
            "log-in-form__radio-btn--active": selectedOption === Control.SignUp,
          })}
        >
          <input
            type="radio"
            className="log-in-form__radio"
            name="log-in-form__radio"
            value={Control.SignUp}
            onChange={onChange}
          />
          Sign up
        </label>
        <label
          className={classNames("log-in-form__radio-btn log-in-form__radio-btn--right", {
            "log-in-form__radio-btn--active": selectedOption === Control.LogIn,
          })}
        >
          <input
            type="radio"
            className="log-in-form__radio"
            name="log-in-form__radio"
            value={Control.LogIn}
            onChange={onChange}
            defaultChecked
            />
            Log in
        </label>
      </div>

      <div className="log-in-form__questionnaire">
        {selectedOption === Control.SignUp ? (
          <SignUpQuestionnaire />
        ) : (
          <LogInQuestionnaire />
        )}
      </div>
    </article>
  );
};
