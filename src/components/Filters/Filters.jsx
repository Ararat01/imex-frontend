import React from "react";
import "./Filters.scss";
import { Switcher } from "../../ui/inputs/Switcher/Switcher";
import { Select } from "./../../ui/inputs/Select/Select";

export const Filters = () => {
  return (
    <div className="filters container">
      <Switcher leftText="Արտահանում" rightText="Ներմուծում" />
      <div className="filters_sort">
        <span>Ֆիլտրել ըստ</span>
        <Select
          def="Ռեյտինգի"
          options={["Գնի՝ Էժանից թանկ", "Գնի՝ Թանկից էժան"]}
        />
      </div>
    </div>
  );
};
