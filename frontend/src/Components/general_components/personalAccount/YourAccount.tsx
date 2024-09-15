import React, { useEffect, useState } from "react";
import "./YourAccount.scss";
import homeIcon from "../../img/header/accountHomeIcon.svg";
import { useAppContext } from "../../../AppContext";
import { SignButton } from "../signButton";
import happyMask from "../../img/AccountImg/happymask.svg";
import { Course } from "../Course";
import { Link, useNavigate } from "react-router-dom";
import { KEY_TOKEN } from "../../../utils/globalVariables";
import { SubmitHandler, useForm } from "react-hook-form";
import { getCurrentUser, updateUser } from "../../../api/userApi";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { FetchErrorMessage } from "../../../types/FetchErrorMessage";
import { validEmail } from "../../../utils/validEmail";
import { CabinetFormInput } from "../../../types/CabinetFormInput";
import classNames from "classnames";
import { MyCalendar } from "./MyCalendar";
import { CourseEvent } from "../../../types/CourseEvent";
import { EventInfo } from "./MyCalendar/EventInfo";

export const YourAccount: React.FC = () => {
  const { userState, setUserState, setIsLoginned, eventInfoIsOpen } = useAppContext();
  const [isRootErrShown, setIsRootErrShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<CourseEvent | null>(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<CabinetFormInput>();

  const [token] = useLocalStorage(KEY_TOKEN, "");

  const setRootError = (str: string) => {
    setError("root", {
      message: str,
      type: "manual",
    });

    setTimeout(() => {
      setIsRootErrShown(true);
    }, 0);

    setTimeout(() => {
      setIsRootErrShown(false);
    }, 2000);

    setTimeout(() => {
      clearErrors("root");
    }, 2500);
  };

  useEffect(() => {
    setIsLoading(true);
    getCurrentUser(token)
      .then((newUser) => {
        reset(newUser);
        setUserState(newUser);
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
            setRootError("Something went wrong. Reload the page.");
            break;
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSave: SubmitHandler<CabinetFormInput> = (data) => {
    console.log(data);
    setIsLoading(true);
    setRootError("Something went wrong. Your changes did not save.");
    // TODO add params
    // updateUser()
    //   .then()
    //   .catch((err: Error) => {
    //     switch (err.message) {
    //       case FetchErrorMessage.Occupied:
    //         setRootError("This email address is already taken");
    //         break;

    //       default:
    //         setRootError("Something went wrong. Your changes did not save.");
    //         userState && reset(userState);
    //         break;
    //     }
    //   })
    //   .finally(() => {
    //     // setIsLoading(false);
    //   });
  };

  const logOut = () => {
    setIsLoginned(false);
    navigate("/");
    setUserState(null);

    window.localStorage.removeItem(KEY_TOKEN);
  };

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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            <div className="cabinet__user-item">
              <label className="cabinet__user-field" htmlFor="userEmail">
                Phone number
              </label>
              <input
                {...register("phoneNumber", { required: true,  })}
                id="userEmail"
                className="cabinet__user-name"
                type="tel"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className="cabinet__submit white-button"
              disabled={isLoading}
            >
              Submit changes?
            </button>

            <button
              type="button"
              className="white-button cabinet__log-out"
              onClick={logOut}
              disabled={isLoading}
            >
              Log Out
            </button>

            {errors.root && (
              <div
                className={classNames("cabinet__err", {
                  'cabinet__err--active': isRootErrShown,
                })}
              >
                <p className="cabinet__err-text">{errors.root?.message}</p>
              </div>
            )}
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
        <div className="cabinet__calendar">
          <h3 className="cabinet__main-title">Schedule</h3>
          <Link to={'/users-table'} className="cabinet__users-table">Users table page</Link>
          <MyCalendar setCurrentEvent={setCurrentEvent}/>
        </div>
      </div>
        <EventInfo currentEvent={currentEvent}/>
    </section>
  );
};
