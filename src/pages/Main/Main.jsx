import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { Card } from "./../../components/Card/Card.jsx";
import { Filters } from "./../../components/Filters/Filters.jsx";
import Header from "./../../components/Header/Header.jsx";
import API_URL from "../../config.js";
import Button from "../../ui/Button/Button.jsx";
import "./Main.scss";

export const Main = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [switcherValue, setSwitcherValue] = useState("import");
  const navigate = useNavigate();
  const getSearchProducts = (data) => {
    setProducts(data);
  };
  useEffect(() => {
    axios
      .get(API_URL + "/product/getallcars")
      .then(({ data }) => {
        console.log(data);

        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Header search searchProduct={getSearchProducts} />
      <div className="container">
        <div className="about">
          <p>{t("about")}</p>
          <div className="about-contact">
            <p>{t("contact")}</p>
            <Button
              className="active"
              text={t("email")}
              click={() =>
                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=ipiex.llc@gmail.com&su=&body="
                )
              }
            />
          </div>
        </div>
      </div>
      <div className="category container">
        <button>
          <img src="/images/1stmarket.png" alt="" />
          <div>
            <h2>{t("primaryMarket")}</h2>
          </div>
        </button>
        <button>
          <img src="/images/2ndmarket.png" alt="" />
          <div>
            <h2>{t("secondaryMarket")}</h2>
          </div>
        </button>
      </div>

      <Filters
        switcherValue={switcherValue}
        setSwitcherValue={setSwitcherValue}
      />
      <div className="container">
        <div className="products">
          {products.length ? (
            products.map((prod, i) => {
              return (
                <div key={i} className="child">
                  <Card
                    name={`${prod.make} ${prod.model} . ${prod.year}`}
                    img={prod.images[3]}
                    price={`${prod.price} ${prod.currency}`}
                    openProduct={() => navigate(`product/${prod._id}`)}
                  />
                </div>
              );
            })
          ) : (
            <div>
              <h4>Արտադրանք չի գտնվել</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
