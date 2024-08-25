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
  name: Path<T & FieldValues>;
  errors: FieldErrors<T & FieldValues>;
  placeholder: string;
  validate?: (value: string, formValues: T) => boolean | string;
  min?: number;
  max?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type State = {
  isShow: boolean;
};

export class QuestionnaireRow<T> extends React.Component<Props<T>, State> {
  constructor(props: Props<T>) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  showOrHide = () => {
    this.setState({ isShow: !this.state.isShow });
  };

  render() {
    const {
      title,
      type,
      register,
      name,
      errors,
      placeholder,
      validate,
      min,
      max,
      onChange = () => {},
    } = this.props;

    const minValid = min
      ? { value: min, message: `Has to be more then ${min} characters` }
      : undefined;
    const maxValid = max
      ? { value: max, message: `Has to be less then ${max} characters` }
      : undefined;

    return (
      <div className="questionnaire-row">
        <label htmlFor={title} className="questionnaire-row__label">
          {title}
        </label>
        <input
          type={
            type !== "password" ? type : this.state.isShow ? "text" : "password"
          }
          id={title}
          className={classNames("questionnaire-row__input", {
            "questionnaire-row__input--error": errors[name],
            "questionnaire-row__input--password": type === 'password',
          })}
          placeholder={placeholder}
          {...register(name, {
            required: "Required field",
            validate,
            minLength: minValid,
            maxLength: maxValid,
          })}
          onChange={onChange}
        />

        {type === "password" && (
          <button
            type="button"
            onMouseDown={this.showOrHide}
            onMouseUp={this.showOrHide}
            className={classNames("questionnaire-row__show-password", {
              "questionnaire-row__show-password--active": this.state.isShow,
            })}
          >
            show password
          </button>
        )}

        <span
          className={classNames("questionnaire-row__error", {
            "questionnaire-row__error--active": errors[name],
          })}
        >
          {errors[name]?.message?.toString()}
        </span>
      </div>
    );
  }
}
