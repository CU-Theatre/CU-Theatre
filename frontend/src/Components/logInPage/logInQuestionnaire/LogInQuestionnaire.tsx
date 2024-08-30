import React from "react";
import "./LogInQuestionnaire.scss";
import {
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { EMAIL_REGEX, KEY_TOKEN, REQUIRED_MESSAGE_ERR } from "../../../utils/globalVariables";
import { logIn } from "../../../api/authApi";
import { LoginData } from "../../../types/LogInTypes";
import { useAppContext } from "../../../AppContext";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useNavigateToPreviousOrHomePage } from "../../../hooks/useNavigateToPreviousOrHomePage";
import { FetchErrorMessage } from "../../../types/FetchErrorMessage";
import { QuestionnaireRow } from "../questionnaireRow";


export const LogInQuestionnaire: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    reset,
  } = useForm<LoginData>();
  const { setIsLoginned } = useAppContext();
  const [, setToken] = useLocalStorage(KEY_TOKEN, "");
  const navigate = useNavigateToPreviousOrHomePage();

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    const trimmedData = { ...data };

    trimmedData.email = data.email.trim(); 
    trimmedData.password = data.password.trim(); 

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

    if (hasEmpty) {
      return;
    }

    logIn(trimmedData)
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
    return EMAIL_REGEX.test(email) || "Incorrect email";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors("root");
    clearErrors(e.target.name as keyof LoginData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="questionnaire">
      <div className="questionnaire__fields">
        <QuestionnaireRow
          title="email"
          type="email"
          register={register}
          errors={errors}
          name="email"
          placeholder="your Email"
          onChange={handleChange}
          validate={validEmail}
          setValue={setValue}
        />

        <QuestionnaireRow
          title="Password"
          type="password"
          register={register}
          errors={errors}
          name="password"
          placeholder="your Password"
          onChange={handleChange}
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
