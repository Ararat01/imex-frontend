import React, { useState } from "react";
import { Card } from "./../../components/Card/Card";
import Categories from "./../../components/Categories/Categories";
import { Filters } from "./../../components/Filters/Filters";
import Services from "./../../components/Services/Services";

export const Main = () => {
  const [category, setCategory] = useState("");
  return (
    <div>
      <Categories category={category} change={setCategory} />
      <Services />
      <Filters />
      <div className="container products">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};
