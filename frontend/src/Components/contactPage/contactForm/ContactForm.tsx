import React from "react";
import "./ContactForm.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import classNames from "classnames";
import { EMAIL_REGEX } from "../../../utils/globalVariables";

type ContactFormType = {
  name: string;
  lastName: string;
  email: string;
  massage: string;
};

export const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormType>();

  const onSubmit: SubmitHandler<ContactFormType> = (data) => {
    const jsonData = JSON.stringify(data);

    console.log(jsonData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <div className="contact-form__input-block contact-form__input-block--name">
        <label
          htmlFor="contact-name"
          className={classNames("contact-form__label", {
            "contact-form__label--error": errors.name,
          })}
        >
          First Name
        </label>
        <input
          className={classNames("contact-form__input", {
            "contact-form__input--error": errors.name,
          })}
          {...register("name", { required: true })}
          id="contact-name"
        />
        {errors.name && (
          <span className={classNames("contact-form__err-mes")}>
            Write your name
          </span>
        )}
      </div>

      <div className="contact-form__input-block contact-form__input-block--last-name">
        <label htmlFor="contact-last-name" className="contact-form__label">
          Last Name
        </label>
        <input className="contact-form__input" {...register("lastName")} />
      </div>

      <div className="contact-form__input-block">
        <label
          htmlFor="contact-last-email"
          className={classNames("contact-form__label", {
            "contact-form__label--error": errors.email,
          })}
        >
          Email
        </label>
        <input
          className={classNames("contact-form__input", {
            "contact-form__input--error": errors.email,
          })}
          {...register("email", { required: true, pattern: EMAIL_REGEX })}
          id="contact-last-email"
        />
        {errors.email && (
          <span className={classNames("contact-form__err-mes")}>
            Your email should be here
          </span>
        )}
      </div>

      <div className="contact-form__input-block">
        <label
          htmlFor="contact-input-massage"
          className={classNames("contact-form__label", {
            "contact-form__label--error": errors.name,
          })}
        >
          Message
        </label>
        <textarea
          className={classNames(
            "contact-form__input contact-form__input--textarea",
            {
              "contact-form__input--error": errors.massage,
            }
          )}
          id="contact-input-massage"
          rows={10}
          {...register("massage", { required: true })}
        ></textarea>
        {errors.massage && (
          <span className={classNames("contact-form__err-mes")}>
            Write your message
          </span>
        )}
      </div>

      <button type="submit" className="contact-form__button">
        Send message
      </button>
    </form>
  );
};
