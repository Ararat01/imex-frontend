import React from "react";
import "./Header.scss";
import Search from "../../ui/inputs/Search/Search";
import Button from "../../ui/Button/Button";
import { Link, Outlet } from "react-router-dom";
import checkAuth from "../../checkAuth";

export default function Header() {
  const auth = checkAuth();

  return (
    <header>
      <div className="container head">
        <Link to={"/"} className="logo">
          <img src="/logo192.png" width="50px" alt="No img" />
          <span>IMEX</span>
        </Link>
        <div className="input">
          <Search />
        </div>
        <div className="account">
          {auth ? (
            <div className="auth">
              <Link to={"reg/"} className="btn">
                Իմ էջը
              </Link>
            </div>
          ) : (
            <div className="no-auth">
              <Link to={"log/"} className="btn active">
                Մուտք գործել
              </Link>
              <Link to={"reg/"} className="btn">
                Գրանցվել
              </Link>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </header>
  );
}
