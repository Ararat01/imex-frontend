import React from "react";
import "./Card.scss";

export const Card = ({ large = false }) => {
  return (
    <div className="card">
      <img src="/images/iphonejpg.jpg" alt="" />
      <h3>Iphone 15</h3>
    </div>
  );
};
