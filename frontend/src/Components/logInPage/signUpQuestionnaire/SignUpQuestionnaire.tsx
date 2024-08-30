import React from "react";
import { QuestionnaireRow } from "../questionnaireRow";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  KEY_TOKEN,
  PHONE_REGEX,
  REQUIRED_MESSAGE_ERR,
} from "../../../utils/globalVariables";
import { logIn, signUp } from "../../../api/authApi";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useNavigateToPreviousOrHomePage } from "../../../hooks/useNavigateToPreviousOrHomePage";
import { SignUpData } from "../../../types/SignUpTypes";
import { FetchErrorMessage } from "../../../types/FetchErrorMessage";
import { validEmail } from "../../../utils/validEmail";
import { useAppContext } from "../../../AppContext";

export const SignUpQuestionnaire: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm<SignUpData>();
  const [, setToken] = useLocalStorage(KEY_TOKEN, "");
  const navigate = useNavigate();
  const navigateToPrev = useNavigateToPreviousOrHomePage();
  const { setIsLoginned } = useAppContext();

  const onSubmit: SubmitHandler<SignUpData> = (data) => {
    const trimmedData = { ...data };

    trimmedData.email = data.email.trim();
    trimmedData.password = data.password.trim();
    trimmedData.repeatPassword = data.repeatPassword.trim();
    trimmedData.firstName = data.firstName.trim();
    trimmedData.lastName = data.lastName.trim();
    trimmedData.phoneNumber = data.phoneNumber.trim();

    let hasEmpty = false;

    if (trimmedData.email.length === 0) {
      reset(trimmedData);
      setError("email", { message: REQUIRED_MESSAGE_ERR });
      hasEmpty = true;
    }

    if (trimmedData.password.length === 0) {
      reset(trimmedData);
      setError("password", { message: REQUIRED_MESSAGE_ERR });
      hasEmpty = true;
    }
    if (trimmedData.repeatPassword.length === 0) {
      reset(trimmedData);
      setError("repeatPassword", { message: REQUIRED_MESSAGE_ERR });
      hasEmpty = true;
    }

    if (trimmedData.firstName.length === 0) {
      reset(trimmedData);
      setError("firstName", { message: REQUIRED_MESSAGE_ERR });
      hasEmpty = true;
    }
    if (trimmedData.lastName.length === 0) {
      reset(trimmedData);
      setError("lastName", { message: REQUIRED_MESSAGE_ERR });
      hasEmpty = true;
    }

    if (trimmedData.phoneNumber.length === 0) {
      reset(trimmedData);
      setError("phoneNumber", { message: REQUIRED_MESSAGE_ERR });
      hasEmpty = true;
    }

    if (hasEmpty) {
      return;
    }

    signUp(trimmedData)
      .then(() => {
        console.log(data);
        logIn({
          email: data.email,
          password: data.password,
        }).then((response) => {
          setToken(response.token);

          setIsLoginned(true);
          navigateToPrev();
        });
      })
      .catch((err: Error) => {
        switch (err.message) {
          case FetchErrorMessage.Occupied:
            setError("root", {
              type: "manual",
              message: FetchErrorMessage.Occupied,
            });
            break;

          case FetchErrorMessage.Unauthorized:
            navigate(".");
            break;

          default:
            setError("root", {
              type: "manual",
              message: "Oops, something's wrong",
            });
            break;
        }
      });
  };

  const validPassword = (rePassword: string, formValues: SignUpData) => {
    const password = formValues.password;

    if (password.trim() !== rePassword.trim()) {
      return "Passwords must match";
    }

    return true;
  };

  const validPhone = (phone: string) => {
    if (!PHONE_REGEX.test(phone)) {
      return "Enter your phone number in a format that is convenient for you";
    }

    return true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="questionnaire">
      <div className="questionnaire__fields">
        <QuestionnaireRow
          title="First name"
          type="text"
          register={register}
          errors={errors}
          name="firstName"
          placeholder="your name"
          setValue={setValue}
        />
        <QuestionnaireRow
          title="Last name"
          type="text"
          register={register}
          errors={errors}
          name="lastName"
          placeholder="your last name"
          setValue={setValue}
        />
        <QuestionnaireRow
          title="Password"
          type="password"
          register={register}
          errors={errors}
          name="password"
          placeholder="password"
          min={8}
          max={35}
          setValue={setValue}
        />
        <QuestionnaireRow
          title="repeat Password"
          type="password"
          register={register}
          errors={errors}
          name="repeatPassword"
          placeholder="repeat Password"
          validate={validPassword}
          min={8}
          max={35}
          setValue={setValue}
        />
        <QuestionnaireRow
          title="Phone number"
          type="tel"
          register={register}
          errors={errors}
          name="phoneNumber"
          placeholder="your phone number"
          validate={validPhone}
          setValue={setValue}
        />
        <QuestionnaireRow
          title="email"
          type="email"
          register={register}
          errors={errors}
          name="email"
          placeholder="your Email"
          validate={validEmail}
          setValue={setValue}
        />

        {errors.root && (
          <p className="questionnaire__error">{errors.root.message}</p>
        )}
      </div>

      <button type="submit" className="questionnaire__button white-button">
        Submit
      </button>
    </form>
  );
};
