import React from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import Button from "../../ui/Button/Button";

export const Login = () => {
  return (
    <div className="container form">
      <form action="">
        <input className="mb10" placeholder="Մուտքանուն" type="text" />
        <input className="mb10" placeholder="Գաղտնաբառ" type="text" />
        <Button text="Մուտք" click={(e) => console.log(e)} />
      </form>
      <p>Դեռ գրանցված չե՞ք</p>
      <Link>Գրանցում</Link>
    </div>
  );
};
