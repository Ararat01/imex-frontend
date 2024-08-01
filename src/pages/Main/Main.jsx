import React, { useEffect, useState } from "react";
import { Card } from "./../../components/Card/Card.jsx";
import Categories from "./../../components/Categories/Categories.jsx";
import { Filters } from "./../../components/Filters/Filters.jsx";
import Services from "./../../components/Services/Services.jsx";
import "./Main.scss";
import axios from "axios";
import Header from "./../../components/Header/Header.jsx";

export const Main = () => {
  const [category, setCategory] = useState("Դեղամիջոցներ");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:4444/product/category", {
        category: category,
      })
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, [category]);
  return (
    <div>
      <Header />
      <Categories category={category} change={setCategory} />
      <Services />
      <Filters />
      <h3 className="container">{category}</h3>
      <div className="container products">
        {products.length ? (
          products.map((prod, i) => {
            return (
              <Card
                key={i}
                name={prod.name}
                img={prod.images[0]}
                price={prod.price}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
