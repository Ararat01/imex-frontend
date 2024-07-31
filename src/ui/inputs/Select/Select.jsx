import React, { useState } from "react";
import "./Select.scss";

export const Select = ({
  def = "Տիպ",
  options = ["Արտահանում", "Ներմուծում"],
}) => {
  const [show, setShow] = useState(false);
  const [option, setOption] = useState(def);
  const changeOption = (opt) => {
    setOption(opt);
  };
  return (
    <div className="select">
      <button onClick={() => setShow(!show)} type="button">
        <span>{option}</span>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </button>
      <div className={`options ${show ? "active" : ""}`}>
        {options.map((text, i) => {
          return (
            <button
              type="button"
              key={i}
              onClick={({target}) => {
                changeOption(target.innerText);
                setShow(false)
              }}
            >
              {text}
            </button>
          );
        })}
      </div>
    </div>
  );
};
