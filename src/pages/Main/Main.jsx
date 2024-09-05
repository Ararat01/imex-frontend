import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { Card } from "./../../components/Card/Card.jsx";
import Categories from "./../../components/Categories/Categories.jsx";
import { Filters } from "./../../components/Filters/Filters.jsx";
import Header from "./../../components/Header/Header.jsx";
import API_URL from "../../config.js";
import Button from "../../ui/Button/Button.jsx";
import "./Main.scss";

export const Main = () => {
  const { categoryHr } = useParams();
  const { t } = useTranslation();
  const [category, setCategory] = useState(categoryHr || "all");
  const [products, setProducts] = useState([]);
  const [switcherValue, setSwitcherValue] = useState("import");
  const navigate = useNavigate();
  const getSearchProducts = (data) => {
    setProducts(data);
  };
  useEffect(() => {
    axios
      .post(API_URL + "/product/category", {
        category: category,
      })
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, [category]);
  return (
    <div>
      <Header search searchProduct={getSearchProducts} />
      <div className="container">
        <div className="about">
          <p>{t('about')}</p>
          <div className="about-contact">
            <p>Կապնվել</p>
            <Button
              className="active"
              text={"Email"}
              click={() =>
                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=ipiex.llc@gmail.com&su=sub&body=hi"
                )
              }
            />
          </div>
        </div>
      </div>
      <Categories
        category={category}
        change={(val) => {
          setCategory(val);
          navigate(`${val}`);
        }}
      />
      <Filters
        switcherValue={switcherValue}
        setSwitcherValue={setSwitcherValue}
      />
      <div className="container">
        <div className="products">
          {products.filter((el) => el.type === switcherValue).length ? (
            products
              .filter((el) => el.type === switcherValue)
              .map((prod, i) => {
                return (
                  <div key={i} className="child">
                    <Card
                      name={prod.name}
                      img={prod.images[0]}
                      price={prod.price}
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
