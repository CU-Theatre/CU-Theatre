import React from "react";
import { QuestionnaireRow } from "../questionnaireRow";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpQuestionnaireType } from "../../../types/SignUpQuestionnaireType";
import { EMAIL_REGEX } from "../../../utils/globalVariables";

export const SignUpQuestionnaire: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpQuestionnaireType>();

  const onSubmit: SubmitHandler<SignUpQuestionnaireType> = (data) => console.log(data);

  const validPassword = (rePassword: string, formValues: SignUpQuestionnaireType) => {
    const password  = formValues.password;

    if (password.trim() !== rePassword.trim()) {
      return false;
    }

    return true
  }

  const validEmail = (email: string) => {
    return EMAIL_REGEX.test(email)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="questionnaire">
      <div className="questionnaire__fields">
        <QuestionnaireRow
          title="First name"
          type="text"
          register={register}
          errorMessage="This field is required"
          errors={errors}
          name="name"
          placeholder="your name"
        />
        <QuestionnaireRow
          title="Last name"
          type="text"
          register={register}
          errorMessage="This field is required"
          errors={errors}
          name="surname"
          placeholder="your last name"
        />
        <QuestionnaireRow
          title="Password"
          type="password"
          register={register}
          errorMessage="This field is required"
          errors={errors}
          name="password"
          placeholder="password"
        />
        <QuestionnaireRow
          title="repeat Password"
          type="password"
          register={register}
          errorMessage="This field is required"
          errors={errors}
          name="repeatPassword"
          placeholder="repeat Password"
          validate={validPassword}
        />
        <QuestionnaireRow
          title="email"
          type="email"
          register={register}
          errorMessage="This field is required"
          errors={errors}
          name="email"
          placeholder="your Email"
          validate={validEmail}
        />
      </div>

      <button type="submit" className="questionnaire__button white-button">
        Submit
      </button>
    </form>
  );
};
