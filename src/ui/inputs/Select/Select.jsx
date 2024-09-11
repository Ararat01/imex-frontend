import React, { useEffect, useState } from "react";
import "./Select.scss";
import { useTranslation } from "react-i18next";

export const Select = ({
  defo = "",
  options = ["Արտահանում", "Ներմուծում"],
  text = "",
  getValue = () => {},
}) => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const [option, setOption] = useState();

  const changeOption = (opt) => {
    setOption(opt);
  };
  useEffect(() => {
    getValue(option);
  }, [option]);
  return (
    <div className="select">
      <span>{text}</span>
      <button onClick={() => setShow(!show)} type="button">
        <span>{t(option) || defo}</span>
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
              onClick={() => {
                changeOption(options[i]);
                setShow(false);
              }}
            >
              {t(text)}
            </button>
          );
        })}
      </div>
    </div>
  );
};
