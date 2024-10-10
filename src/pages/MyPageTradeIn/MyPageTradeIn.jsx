import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import API_URL from "../../config.js";
import { useNavigate, useParams } from "react-router-dom";

export const MyPageTradeIn = () => {
  const [user, setUser] = useState(null);
  const { ln } = useParams();
  const token = window.localStorage.getItem("tokenTr");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${API_URL}/auth/tradeInGetMe`, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setUser(data);
      })
      .catch((err) => {
        navigate(`/${ln}/tradein/login`);
      });
  }, []);

  return (
    <div>
      <Header options={false} />
    </div>
  );
};
