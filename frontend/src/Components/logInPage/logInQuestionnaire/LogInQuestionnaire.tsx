import React, { useState } from "react";
import "./LogInQuestionnaire.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../../../utils/globalVariables";
import { logIn } from "../../../api/userApi";
import { LoginData } from "../../../types/LogInTypes";
import { useAppContext } from "../../../AppContext";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { ErrorResponses } from "../../../types/ErrorResponses";
import classNames from "classnames";

export const LogInQuestionnaire: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginData>();
  const { setIsLoginned } = useAppContext();
  const [, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();
  const [isWrongData, setIsWrongData] = useState(true);

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    logIn(data)
      .then((response) => {
        if (response === ErrorResponses.Authorization) {
          setError("root", { message: "Wrong email or password" });

          return;
        }

        setIsLoginned(true);

        console.log(response);

        setToken(response.token);

        if (window.history.state && window.history.state.idx > 0) {
          navigate(-1);
        } else {
          navigate("/"); // Navigate to the home page if going back isn't possible within your site
        }
      })
      .catch((e) => console.log(e));
  };

  const validEmail = (email: string) => {
    return EMAIL_REGEX.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      clearErrors('root');
      clearErrors(e.target.name as keyof LoginData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="questionnaire">
      <div className="questionnaire__fields">
        <div className="questionnaire-row">
          <label htmlFor="email" className="questionnaire-row__label">
            email
          </label>
          <input
            type="email"
            id="email"
            className={classNames("questionnaire-row__input", {
              "questionnaire-row__input--error": errors.email || isWrongData,
            })}
            placeholder="your Email"
            {...register("email", { required: true, validate: validEmail })}
            onChange={handleChange}
          />
          <span
            className={classNames("questionnaire-row__error", {
              "questionnaire-row__error--active": errors.email,
            })}
          >
            Incorrect email
          </span>
        </div>

        <div className="questionnaire-row">
          <label htmlFor="Password" className="questionnaire-row__label">
            Password
          </label>
          <input
            type="password"
            id="Password"
            className={classNames("questionnaire-row__input", {
              "questionnaire-row__input--error": errors.password || isWrongData,
            })}
            placeholder="your Password"
            {...register("password", { required: true })}
          />
          <span
            className={classNames("questionnaire-row__error", {
              "questionnaire-row__error--active": errors.password,
            })}
          >
            Incorrect password
          </span>
        </div>

        {errors.root && (
          <p className="questionnaire__error">Wrong email or password</p>
        )}
      </div>

      <button type="submit" className="questionnaire__button white-button">
        Submit
      </button>
    </form>
  );
};
