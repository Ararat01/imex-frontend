import React, { useEffect } from "react";
import "./LoadingCreating.scss";

export const LoadingCreating = ({ show = false, loaded = 0 }) => {
  document.body.style.overflow = show ? "hidden" : "auto";
  useEffect(() => {
    if (show) {
      window.scrollTo({
        top: 0,
      });
    }
  }, [show]);
  return show ? (
    <div className="load">
      <div className="load_block">
        <div className="load_block_range">
          <div
            style={{ width: `${loaded * 25}%` }}
            className="load_block_loaded"
          ></div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
