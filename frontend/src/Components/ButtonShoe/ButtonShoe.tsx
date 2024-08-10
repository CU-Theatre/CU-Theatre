import React from "react";
import style from './ButtonShoe.module.scss'

export const ButtonShoe: React.FC = () => {
  return (
    <button type="button" className={style.button}>
      <span className={style.button__text}>Sign up for a course</span>
      <div className={style.button__shoe} />
    </button>
  );
};
