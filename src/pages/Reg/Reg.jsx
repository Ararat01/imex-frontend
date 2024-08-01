import React from "react";
import "./Reg.scss";
import { Link } from "react-router-dom";
import Button from "../../ui/Button/Button";
import { Switcher } from "../../ui/inputs/Switcher/Switcher";
import { Select } from "../../ui/inputs/Select/Select";
import Header from "../../components/Header/Header";

export const Reg = () => {
  return (
    <>
      <Header />
      <div className="container form">
        <form action="">
          <div className="flex mb10">
            <Switcher leftText="ԱՁ" rightText="ՍՊԸ" />
            <Select />
          </div>
          <input className="mb10" placeholder="Անվանում" type="text" />
          <input className="mb10" placeholder="+374 99 01-02-03" type="tel" />
          <input className="mb10" placeholder="Էլ․ հասցե" type="email" />
          <label className="mb10" htmlFor="info">
            Ներկայացրեք թե ինչով եք զբաղվում
          </label>
          <textarea className="mb10" rows="5" name="info" id="info"></textarea>
          <input className="mb10" placeholder="Մուտքանուն" type="text" />
          <input className="mb10" placeholder="Գաղտնաբառ" type="password" />
          <Button text="Գրանցվել" click={(e) => console.log(e)} />
        </form>
        <p>Արդեն գրանցված ե՞ք</p>
        <Link>Մուտք</Link>
      </div>
    </>
  );
};
