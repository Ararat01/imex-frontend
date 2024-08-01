import React from "react";
import "./Card.scss";

export const Card = ({ large = false, name, img, price }) => {
  return (
    <div className="card">
      <img src={img} alt="" />
      <h3>{name}</h3>
      <span>{price}</span>
    </div>
  );
};
