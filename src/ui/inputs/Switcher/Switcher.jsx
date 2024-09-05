import React from "react";
import "./Switcher.scss";
import { useTranslation } from "react-i18next";

export const Switcher = ({
  leftText,
  rightText,
  selected = leftText,
  changeSelect,
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="switcher">
      <button
        type="button"
        onClick={() => changeSelect(leftText)}
        className={`switcher_left ${
          t(selected) === t(leftText) ? "active" : ""
        }`}
      >
        {t(leftText)}
      </button>
      <button
        type="button"
        onClick={() => changeSelect(rightText)}
        className={`switcher_right ${
          t(selected) === t(rightText) ? "active" : ""
        }`}
      >
        {t(rightText)}
      </button>
    </div>
  );
};
