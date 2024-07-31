import React from "react";
import "./Filters.scss";
import { Switcher } from "../../ui/inputs/Switcher/Switcher";

export const Filters = () => {
  return (
    <div className="filters container">
      <Switcher leftText="Արտահանում" rightText="Ներմուծում" />
      <p>
        Ֆիլտրել ըստ{" "}
        <select name="filter" id="filter">
          <option defaultValue value="rating">
            Ռեյտինգի
          </option>
          <option value="cheap">Գնի՝ Էժանից թանկ</option>
          <option value="exp">Գնի՝ Թանկից էժան</option>
        </select>
      </p>
    </div>
  );
};
