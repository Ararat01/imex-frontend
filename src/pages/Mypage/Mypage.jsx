import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import "./Mypage.scss";
import { useNavigate } from "react-router-dom";
import checkAuth from "../../checkAuth";
import API_URL from "../../config";
import axios from "axios";

export const Mypage = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const auth = checkAuth();
  useEffect(() => {
    if (!auth) {
      navigate("/");
    } else {
        axios.get(API_URL + "/auth/me")
    }
  }, []);
  return (
    <div>
      <Header />
      <div className="container"></div>
    </div>
  );
};
