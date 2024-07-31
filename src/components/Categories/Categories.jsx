import React, { useEffect, useState } from "react";
import "./Categories.scss";
import Button from "../../ui/Button/Button";
import axios from "axios";

export default function Categories({ category = "", change }) {
  const [categories, setCategories] = useState([]);
  const changeCategory = (e) => {
    change(e.innerText);
  };
  useEffect(() => {
    axios
      .get("http://localhost:4444/export/get")
      .then(({ data }) => {
        setCategories(data);
        // setCurrent(data[0].name);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="categories container">
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
  );
}
