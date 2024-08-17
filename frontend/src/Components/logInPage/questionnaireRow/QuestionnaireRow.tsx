import classNames from "classnames";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import "./QuestionnaireRow.scss";
import React from "react";

type Props<T> = {
  title: string;
  type: string;
  register: UseFormRegister<T & FieldValues>;
  errorMessage: string;
  name: Path<T & FieldValues>;
  errors: FieldErrors<T & FieldValues>;
  placeholder: string;
  validate?: (value: string, formValues: T) => boolean;
};

export class QuestionnaireRow<T> extends React.Component<Props<T>> {
  render() {
    const { title, type, register, errorMessage, name, errors, placeholder, validate } =
      this.props;

    return (
      <div className="questionnaire-row">
        <label htmlFor={title} className="questionnaire-row__label">
          {title}
        </label>
        <input
          type={type}
          id={title}
          className={classNames("questionnaire-row__input", {
            "questionnaire-row__input--error": errors[name],
          })}
          placeholder={placeholder}
          {...register(name, { required: true, validate })}
        />
        <span
          className={classNames("questionnaire-row__error", {
            "questionnaire-row__error--active": errors[name],
          })}
        >
          {errorMessage}
        </span>
      </div>
    );
  }
}
