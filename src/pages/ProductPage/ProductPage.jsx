import React, { useEffect, useState } from "react";
import "./ProductPage.scss";
import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config";
import { useTranslation } from "react-i18next";
import { Leasing } from "../../components/Leasing/Leasing";
import Button from "../../ui/Button/Button";

export const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [leasing, setLeasing] = useState(false);
  const notShow = [
    "currency",
    "_id",
    "images",
    "userId",
    "createdAt",
    "updatedAt",
    "__v",
    "info",
    "price",
    "videos",
    "make",
    "model",
    "mileage",
    "km",
  ];
  const { t } = useTranslation();
  useEffect(() => {
    axios
      .get(`${API_URL}/product/${id}`)
      .then(({ data }) => {
        console.log(data);

        setProduct(data);
        console.log(Object.entries(product));
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div>
      <Header />
      {product ? (
        <>
          <div className="container path">
            <span>{t(product.market)}</span>
          </div>
          <div className="product container">
            <div className="product_images">
              <img src={product.images[imageIndex]} alt="" />
              <div className="product_images-select">
                {product.images.map((src, i) => {
                  return (
                    <button
                      key={i}
                      className={i === imageIndex ? "active" : ""}
                      onClick={() => setImageIndex(i)}
                    >
                      <img src={src} alt="" />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="product_info">
              <div className="product_info__header">
                <h3>{`${product.make} ${product.model}`}</h3>
                <Button
                  text={leasing ? t("carInfo") : t("buyLeasing")}
                  click={() => setLeasing(!leasing)}
                />
              </div>

              <h4>{`${product.price} ${product.currency}`}</h4>
              {!leasing ? (
                <>
                  {product ? (
                    <div className="list">
                      {Object.entries(product)
                        .filter((el) => !notShow.includes(el[0]))
                        .map((el, i) => {
                          return (
                            <div key={i}>
                              <p>{t(el[0])}</p>
                              <span>{t(el[1])}</span>
                            </div>
                          );
                        })}
                      <div>
                        <p>{t("mileage")}</p>
                        <span>{`${t(product.mileage)} ${t(product.km)}`}</span>
                      </div>
                      <div className="contact">
                        <p>Կապնվել</p>
                        <a href="tel:+1234567890">
                          {product.contact}
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"
                                stroke="#5c9cee"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>{" "}
                            </g>
                          </svg>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <p className="product_info-text">{product.info}</p>
                </>
              ) : (
                <Leasing />
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
