import React from "react";
import { useTranslation } from "react-i18next";
import "./LangSwitcher.scss";
import { HyIcon } from "./HyIcon";
import { RuIcon } from "./RuIcon";
import { useNavigate, useParams } from "react-router-dom";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { ln = "hy" } = useParams();
  const navigate = useNavigate();

  const changeLanguage = (newLang) => {
    const currentPath = window.location.pathname.replace(`/${ln}`, "");

    navigate(`/${newLang}${currentPath}`);
  };

  const handleLanguageChange = (lng) => {
    changeLanguage(lng);

    i18n.changeLanguage(lng);
  };

  return (
    <div className="langSw">
      <div className="selected">{ln === "hy" ? <HyIcon /> : <RuIcon />}</div>
      <div className="langSw-select">
        <button type="button" onClick={() => handleLanguageChange("hy")}>
          <HyIcon />
        </button>
        <button type="button" onClick={() => handleLanguageChange("ru")}>
          <RuIcon />
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
