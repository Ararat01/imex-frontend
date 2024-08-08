import React from "react";
import "./Button.scss";

const Button = ({ text, className = "", click, type = "button" }) => {
  const btnClick = (e) => {
    e.preventDefault();
    click(e.target);
  };
  return (
    <button type={type} onClick={btnClick} className={"btn " + className}>
      {text}
    </button>
  );
};

export default Button;
