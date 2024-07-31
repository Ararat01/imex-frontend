import React from "react";
import "./Button.scss";

const Button = ({ text, className = "", click }) => {
  const btnClick = (e) => {
    e.preventDefault();
    click(e.target);
  };
  return (
    <button type="button" onClick={btnClick} className={"btn " + className}>
      {text}
    </button>
  );
};

export default Button;
