import React, { useState } from "react";
import "./Filters.scss";
import { Switcher } from "../../ui/inputs/Switcher/Switcher";
import { Select } from "./../../ui/inputs/Select/Select";

export const Filters = ({ switcherValue, setSwitcherValue }) => {
  const changeSwitcher = (val) => {
    setSwitcherValue(val);
  };

  return (
    <div className="container">
      <div className="filters">
        <Switcher
          leftText="export"
          rightText="import"
          selected={switcherValue}
          changeSelect={changeSwitcher}
        />
        <div className="filters_sort">
          <span>Ֆիլտրել ըստ</span>
          <Select
            def="Ռեյտինգի"
            options={["Ռեյտինգի", "Գնի՝ Էժանից թանկ", "Գնի՝ Թանկից էժան"]}
          />
        </div>
      </div>
    </div>
  );
};
