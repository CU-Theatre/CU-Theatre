import React from "react";
import "./Touch.scss";
import { ContactForm } from "../contactForm";

export const Touch: React.FC = () => {
  return (
    <section className="touch">
      <div className="touch__container">
        <div className="touch__info">
          <h1 className="touch__title title">Get in Touch</h1>

          <h2 className="touch__subtitle">Do You have some questions?</h2>

          <p className="touch__greeting">
            Reach out to us regarding any inquiries or questions you may have.
            We're excited to hear from you
          </p>

          <div className="touch__links">
            <a href="mailto:" className="touch__link">
              Email
            </a>

            <a href="tel:+" className="touch__link">
              Tell
            </a>

            <a
              href="https://maps.app.goo.gl/8xqPXXouaUgFtgxTA"
              target="_blank"
              rel="noopener noreferrer"
              className="touch__link"
            >
              11 William Street S, Dublin, County Dublin D02 N727, IE
            </a>
          </div>

          <div className="touch__medias">
            <a
              href="https://www.instagram.com/cu.theater?igsh=MWpyNGY2ejF6bGhmMQ=="
              className="touch__media touch__media--inst"
            >
              instagram
            </a>
            <a href="#" className="touch__media touch__media--fb">
              facebook
            </a>
          </div>
        </div>

        <div className="touch__form">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
