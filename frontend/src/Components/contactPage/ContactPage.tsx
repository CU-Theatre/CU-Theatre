import React from "react";
import "./ContactPage.scss";
import { Touch } from "./touch";
import { useAppContext } from "../../AppContext";
import { Loader } from "../general_components/Loader";

export const ContactPage: React.FC = () => {
  const { contactPageLoader } = useAppContext();
  return (
    contactPageLoader ? (
      <Loader />
    ) : (
      <main className="contacts">
        <Touch />
      </main>
    )
  );
}