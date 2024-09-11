import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.scss";
import API_URL from "../../../config";
import { useTranslation } from "react-i18next";

export default function Search({searchProduct}) {
  const [data, setData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  const handleSearchChange = (input) => {
    setSearchQuery(input.target.value);
  };

  const handleSearch = () => {
    axios
      .post(API_URL + "/product/search", { name: searchQuery })
      .then(({data}) => {
        searchProduct(data);
      })
      .catch((err) => err);
  };

  return (
    <div className="search-container">
      <div className="search-main">
        <input
          type="text"
          className="search-input"
          placeholder={t("search")}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
        />
        <button className="search-button" onClick={handleSearch}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="search-icon"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                stroke="#2a2a2a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
