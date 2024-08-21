import React from "react";
import "./LogInQuestionnaire.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { QuestionnaireRow } from "../questionnaireRow";
import { LogInInputsType } from "../../../types/LogInInputsType";
import { EMAIL_REGEX } from "../../../utils/globalVariables";

export const LogInQuestionnaire: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInInputsType>();

  const onSubmit: SubmitHandler<LogInInputsType> = (data) => console.log(data);

  const validEmail = (email: string) => {
    return EMAIL_REGEX.test(email)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="questionnaire">
      <div className="questionnaire__fields">
        <QuestionnaireRow
          title="email"
          type="email"
          register={register}
          errorMessage="Incorrect email"
          errors={errors}
          name="email"
          placeholder="your Email"
          validate={validEmail}
        />

        <QuestionnaireRow
          title="Password"
          type="password"
          register={register}
          errorMessage="Incorrect password"
          errors={errors}
          name="password"
          placeholder="your Password"
        />
      </div>

      <button type="submit" className="questionnaire__button white-button">Submit</button>
    </form>
  );
};
