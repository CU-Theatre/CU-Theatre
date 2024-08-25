import React, { useState } from "react";
import "./YourAccount.scss";
import homeIcon from "../../img/header/accountHomeIcon.svg";
import { useAppContext } from "../../../AppContext";
import { SignButton } from "../signButton";
import happyMask from "../../img/AccountImg/happymask.svg";
import { Course } from "../Course";
import { useNavigate } from "react-router-dom";
import { KEY_TOKEN } from "../../../utils/globalVariables";

export const YourAccount: React.FC = () => {
  const { userState, setUserState, setIsLoginned } = useAppContext();

  const navigate = useNavigate();

  const { name, surname, email, currentCourse } = userState;
  const [nameState, setNameState] = useState(name);
  const [surnameState, setSurNameState] = useState(surname);
  const [emailState, setEmailState] = useState(email);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameState(e.target.value);
  };
  const handleChangeSurName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurNameState(e.target.value);
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(e.target.value);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserState((prevState) => ({
      ...prevState,
      name: nameState,
      surname: surnameState,
      email: emailState,
    }));
  };

  const logOut = () => {
    setIsLoginned(false);

    navigate("/");

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
            <h3 className="cabinet__subtitle">{`Hello, ${name} 😎`}</h3>
          </div>
          <form className="cabinet__user-info" onSubmit={handleSave}>
            <div className="cabinet__user-item">
              <label className="cabinet__user-field" htmlFor="username">
                First name
              </label>
              <input
                id="username"
                className="cabinet__user-name"
                type="text"
                value={nameState}
                onChange={handleChangeName}
              />
            </div>
            <div className="cabinet__user-item">
              <label className="cabinet__user-field" htmlFor="usersurname">
                Last name
              </label>
              <input
                id="usersurname"
                className="cabinet__user-name"
                type="text"
                value={surnameState}
                onChange={handleChangeSurName}
              />
            </div>
            <div className="cabinet__user-item">
              <label className="cabinet__user-field" htmlFor="useremail">
                First name
              </label>
              <input
                id="useremail"
                className="cabinet__user-name"
                type="text"
                value={emailState}
                onChange={handleChangeEmail}
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
        {currentCourse.length < 1 ? (
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
              {currentCourse.map((course) => (
                <Course key={course.courseName} course={course} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
