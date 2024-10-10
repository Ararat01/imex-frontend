import React from "react";
import "./Login.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button/Button";
import axios from "axios";
import API_URL from "../../config";
import Header from "../../components/Header/Header";

export const TradeInLogin = () => {
  const navigate = useNavigate();
  const { ln } = useParams();

  const onSubmit = () => {
    const values = getValues();
    if (window.localStorage.getItem("token") !== null) return;
    axios
      .post(`${API_URL}/auth/tradeInLogin`, values)
      .then((res) => {
        window.localStorage.setItem("tokenTr", res.data.token);
        navigate(`/${ln}/tradeInMyPage`);
      })
      .catch((err) => console.log(err));
  };

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  return (
    <>
      <Header />
      <div className="container logForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="mb10"
            autoComplete="off"
            type="email"
            placeholder="Էլ․ հասցե"
            {...register("email", { required: "Email.." })}
            name="email"
          />
          <input
            className="mb10"
            placeholder="Գաղտնաբառ"
            autoComplete="off"
            type="password"
            {...register("password", {
              required: true,
              minLength: 4,
            })}
            name="password"
          />
          <Button type="submit" text="Մուտք" click={onSubmit} />
        </form>
      </div>
    </>
  );
};
