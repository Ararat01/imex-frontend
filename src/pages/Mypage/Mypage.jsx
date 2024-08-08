import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./Mypage.scss";
import { useNavigate } from "react-router-dom";
import checkAuth from "../../checkAuth";
import API_URL from "../../config";
import axios from "axios";
import UploadImage from "./../../ui/inputs/UploadImage/UploadImage";
import Services from "../../components/Services/Services";
import { Card } from "../../components/Card/Card";

export const Mypage = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const auth = checkAuth();
  const token = window.localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [createdDate, setCreatedDate] = useState("");

  useEffect(() => {
    if (!auth) {
      navigate("/");
    } else {
      axios
        .get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: token,
          },
        })
        .then(({ data }) => {
          console.log(data);

          setUser(data);
          const date = new Date(data.createdAt);
          const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          };
          setCreatedDate(date.toLocaleString("hy-AM", options));

          if (data.verified) {
            console.log(1);

            axios
              .post(
                `${API_URL}/product/user`,
                { userId: data._id },
                { headers: { Authorization: token } }
              )
              .then(({ data }) => {
                setProducts(data);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div>
      <Header />
      <div className="container">
        {user ? (
          <>
            <div className="user">
              <div className="user_info">
                <div className="user_info-name">
                  <h2>{user.name}</h2>
                  <img src={user.logo} />
                </div>
                <p>{user.about}</p>
                <div className="user_info-table">
                  <div>
                    <p>Տիպ</p>
                    <span>{user.type}</span>
                  </div>
                  <div>
                    <p>Կառուցվածքը</p>
                    <span>{user.kind}</span>
                  </div>
                  <div>
                    <p>Հեռախոսահամար</p>
                    <span>{user.phone}</span>
                  </div>
                  <div>
                    <p>Էլ․ հասցե</p>
                    <span>{user.email}</span>
                  </div>
                  <div>
                    <p>Գրանցված է</p>
                    <span>{createdDate}</span>
                  </div>
                  <div>
                    <p>Ստուգված</p>
                    <span style={{ color: user.verified ? "green" : "red" }}>
                      {user.verified ? (
                        "այո"
                      ) : (
                        <button className="notverified">
                          <span>ոչ</span>
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
                                d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13"
                                stroke="#ff0000"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>{" "}
                              <circle
                                cx="12"
                                cy="16"
                                r="1"
                                fill="#ff0000"
                              ></circle>{" "}
                              <path
                                d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                                stroke="#ff0000"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>{" "}
                            </g>
                          </svg>{" "}
                        </button>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="user_services">
                <Services />
              </div>
            </div>
            <div className="myProducts">
              <button
                className="add child"
                disabled={!user.verified}
                onClick={() => navigate(`create/${user._id}`)}
              >
                <span>Ավելացնել արտադրանք</span>
                <span>
                  <svg
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g
                        id="Page-1"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          id="Icon-Set-Filled"
                          transform="translate(-102.000000, -1037.000000)"
                          fill="#ffffff"
                        >
                          <path
                            d="M124,1054 L119,1054 L119,1059 C119,1059.55 118.552,1060 118,1060 C117.448,1060 117,1059.55 117,1059 L117,1054 L112,1054 C111.448,1054 111,1053.55 111,1053 C111,1052.45 111.448,1052 112,1052 L117,1052 L117,1047 C117,1046.45 117.448,1046 118,1046 C118.552,1046 119,1046.45 119,1047 L119,1052 L124,1052 C124.552,1052 125,1052.45 125,1053 C125,1053.55 124.552,1054 124,1054 L124,1054 Z M130,1037 L106,1037 C103.791,1037 102,1038.79 102,1041 L102,1065 C102,1067.21 103.791,1069 106,1069 L130,1069 C132.209,1069 134,1067.21 134,1065 L134,1041 C134,1038.79 132.209,1037 130,1037 L130,1037 Z"
                            id="plus-square"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              </button>
              {products.length ? (
                products.map((prod, i) => {
                  return (
                    <div key={i} className="child">
                      <Card
                        openProduct={() => navigate(`/product/${prod._id}`)}
                        name={prod.name}
                        img={prod.images[0]}
                        price={prod.price}
                        edit
                      />
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
