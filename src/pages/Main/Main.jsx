import React, { useEffect, useState } from "react";
import { Card } from "./../../components/Card/Card.jsx";
import Categories from "./../../components/Categories/Categories.jsx";
import { Filters } from "./../../components/Filters/Filters.jsx";
import "./Main.scss";
import axios from "axios";
import Header from "./../../components/Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config.js";

export const Main = () => {
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [switcherValue, setSwitcherValue] = useState("Ներմուծում");
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
      <Header searchProduct={getSearchProducts} />
      <Categories category={category} change={setCategory} />
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
