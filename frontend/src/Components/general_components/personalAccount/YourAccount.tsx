import React, { useEffect, useState } from "react";
import "./YourAccount.scss";
import homeIcon from "../../img/header/accountHomeIcon.svg";
import { useAppContext } from "../../../AppContext";
import { SignButton } from "../signButton";
import happyMask from "../../img/AccountImg/happymask.svg";
import { Course } from "../Course";
import { useNavigate } from "react-router-dom";
import { KEY_TOKEN } from "../../../utils/globalVariables";
import { SubmitHandler, useForm } from "react-hook-form";
import { getCurrentUser } from "../../../api/userApi";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { FetchErrorMessage } from "../../../types/FetchErrorMessage";
import { validEmail } from "../../../utils/validEmail";

interface CabinetFormInput {
  firstName: string;
  lastName: string;
  email: string;
}

export const YourAccount: React.FC = () => {
  const { userState, setUserState, setIsLoginned } = useAppContext();

  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<CabinetFormInput>();

  const [token] = useLocalStorage(KEY_TOKEN, "");

  useEffect(() => {
    getCurrentUser(token)
      .then((newUser) => {
        reset(newUser);
      })
      .catch((err: Error) => {
        switch (err.message) {
          case FetchErrorMessage.Unauthorized:
          case FetchErrorMessage.InternalServerError:
            setIsLoginned(false);
            navigate("/log-in");
            break;

          default:
            console.error(err);
            // TODO add message Unexpected Error
            break;
        }
      });
  }, []);

  const handleSave: SubmitHandler<CabinetFormInput> = (data) => {
    console.log(data);
  };

  const logOut = () => {
    setIsLoginned(false);

    navigate("/");

    window.localStorage.removeItem(KEY_TOKEN);
  };

  // TODO add massages that are for no valid case

  // TODO add disabled while waite fetch

  // TODO add save new user state

  return (
    <section className="cabinet">
      <div className="cabinet__container">
        <div className="cabinet__content">
          <div className="cabinet__top-block">
            <div className="cabinet__title-block">
              <img className="cabinet__icon" src={homeIcon} alt="home-icon" />
              <h2 className="cabinet__title title">Your account</h2>
            </div>
            <h3 className="cabinet__subtitle">{`Hello, ${userState?.firstName} 😎`}</h3>
          </div>

          <form
            className="cabinet__user-info"
            onSubmit={handleSubmit(handleSave)}
          >
            <div className="cabinet__user-item">
              <label className="cabinet__user-field" htmlFor="username">
                First name
              </label>
              <input
                {...register("firstName", { required: true })}
                id="username"
                className="cabinet__user-name"
                type="text"
              />
            </div>
            <div className="cabinet__user-item">
              <label className="cabinet__user-field" htmlFor="usersurname">
                Last name
              </label>
              <input
                {...register("lastName", { required: true })}
                id="usersurname"
                className="cabinet__user-name"
                type="text"
              />
            </div>
            <div className="cabinet__user-item">
              <label className="cabinet__user-field" htmlFor="userEmail">
                Email
              </label>
              <input
                {...register("email", { required: true, validate: validEmail })}
                id="userEmail"
                className="cabinet__user-name"
                type="email"
              />
            </div>

            <button type="submit" className="cabinet__submit white-button">
              Submit changes?
            </button>

            <button
              type="button"
              className="white-button cabinet__log-out"
              onClick={logOut}
            >
              Log Out
            </button>
          </form>

          <img
            className="cabinet__happy-mask"
            src={happyMask}
            alt="happymask"
          />
        </div>
        {userState?.currentCourse?.length &&
        userState?.currentCourse?.length < 1 ? (
          <div className="cabinet__main">
            <h3 className="cabinet__main-title">
              {"You are not subscribed to any course yet :("}
            </h3>
            <SignButton title="Sign for a course?" />
          </div>
        ) : (
          <div className="cabinet__main">
            <h3 className="cabinet__main-title">Assigned courses:</h3>
            <div className="cabinet__courses">
              {userState?.currentCourse?.map((course) => (
                <Course key={course.courseName} course={course} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
