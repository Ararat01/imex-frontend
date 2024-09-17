import React from "react";
import "./Services.scss";

export default function Services() {
  return (
    <>
      <h3 className="title">Օգտվեք մեր հատուկ ծառայություններից</h3>
      <div className="services">
        <div>
          <button>
            <img width="100%" src="/images/finance.jpg" alt="" />
          </button>
          <p>Ֆինանսական հաշվետվություն</p>
        </div>
        <div className="mrl2">
          <button>
            <img width="100%" src="/images/brocerage.png" alt="" />
          </button>
          <p>Բրոկերային ծառայություններ</p>
        </div>
        <div>
          <button>
            <img width="100%" src="/images/logist.jpg" alt="" />
          </button>
          <p>Լոգիստիկ ծառայություններ</p>
        </div>
      </div>
    </>
  );
}
