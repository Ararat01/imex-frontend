import React from "react";
import "./Switcher.scss";

export const Switcher = ({
  leftText,
  rightText,
  selected = leftText,
  changeSelect,
}) => {
  return (
    <div className="switcher">
      <button
        type="button"
        onClick={() => changeSelect(leftText)}
        className={`switcher_left ${selected === leftText ? "active" : ""}`}
      >
        {leftText}
      </button>
      <button
        type="button"
        onClick={() => changeSelect(rightText)}
        className={`switcher_right ${selected === rightText ? "active" : ""}`}
      >
        {rightText}
      </button>
    </div>
  );
};
