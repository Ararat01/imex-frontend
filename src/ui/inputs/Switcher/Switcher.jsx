import React from "react";
import "./Switcher.scss";

export const Switcher = ({ leftText, rightText }) => {
  return (
    <div className="switcher">
      <button type="button" className="switcher_left active">
        {leftText}
      </button>
      <button type="button" className="switcher_right">
        {rightText}
      </button>
    </div>
  );
};
