import React from "react";
import "./LogInQuestionnaire.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../../../utils/globalVariables";
import { logIn } from "../../../api/userApi";
import { LoginData } from "../../../types/LogInTypes";
import { useAppContext } from "../../../AppContext";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import classNames from "classnames";
import { useNavigateToPreviousOrHomePage } from "../../../hooks/useNavigateToPreviousOrHomePage";
import { FetchErrorMessage } from "../../../types/FetchErrorMessage";

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
  const navigate = useNavigateToPreviousOrHomePage();

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    logIn(data)
      .then((response) => {
        setIsLoginned(true);

        setToken(response.token);

        navigate();
      })
      .catch((err: Error) => {
        switch (err.message) {
          case FetchErrorMessage.Unauthorized:
            setError("root", { message: "Wrong email or password" });
            break;
        
          default:
            setError("root", { message: "Oops, something's wrong" });
            break;
        }
      });
  };

  const validEmail = (email: string) => {
    return EMAIL_REGEX.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors("root");
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
              "questionnaire-row__input--error": errors.email,
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
              "questionnaire-row__input--error": errors.password,
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
