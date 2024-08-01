import React from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button/Button";
import axios from "axios";
import API_URL from "./../../config";
import Header from "./../../components/Header/Header";

export const Login = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    const values = getValues();
    if (window.localStorage.getItem("token") !== null) return;
    axios
      .post(`${API_URL}/auth/login`, values)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        navigate("/");
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
      <div className="container form">
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
          <Button text="Մուտք" click={onSubmit} />
        </form>
        <p>Դեռ գրանցված չե՞ք</p>
        <Link>Գրանցում</Link>
      </div>
    </>
  );
};
