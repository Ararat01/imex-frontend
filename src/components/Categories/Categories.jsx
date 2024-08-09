import React, { useEffect, useState } from "react";
import "./Categories.scss";
import Button from "../../ui/Button/Button";
import axios from "axios";
import API_URL from "../../config";

export default function Categories({ category = "", change }) {
  const [categories, setCategories] = useState([]);
  const [more, setMore] = useState(false);
  const changeCategory = (e) => {
    setMore(false);
    change(e.innerText);
  };
  useEffect(() => {
    axios
      .get(API_URL + "/export/get")
      .then(({ data }) => {
        setCategories(data);
        // setCurrent(data[0].name);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h3>Կատեգորիա</h3>

      <p className="selected">{category === "all" ? "" : category}</p>
      <div className="categories" style={{ height: more ? "auto" : "0px" }}>
        {categories.map(({ name }, i) => {
          if (
            name[0].toUpperCase() !== categories[i - 1]?.name[0].toUpperCase()
          ) {
            return (
              <div key={i}>
                <span>{name[0]}</span>
                <Button
                  click={changeCategory}
                  className={`transparent ${name === category ? "active" : ""}`}
                  text={name}
                />
              </div>
            );
          }
          return (
            <div key={i}>
              <Button
                click={changeCategory}
                className={`transparent ${name === category ? "active" : ""}`}
                text={name}
              />
            </div>
          );
        })}
      </div>
      <button className="more" onClick={() => setMore(!more)}>
        <span>{more ? "Փակել" : "Ընտրել կատեգորիա"}</span>
        <svg
          viewBox="0 0 24 24"
          style={{ transform: more ? "rotateZ(180deg)" : "" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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
    </div>
  );
}
