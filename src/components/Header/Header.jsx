import React, { useEffect } from "react";
import "./Header.scss";
import Search from "../../ui/inputs/Search/Search";
import { Link, Outlet } from "react-router-dom";
import checkAuth from "../../checkAuth";
import Button from "../../ui/Button/Button";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const auth = checkAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/log");
  };

  return (
    <header>
      <div className="container head">
        <Link to={"/"} className="logo">
          <img src="/log.png" alt="No img" />
          <p>
            <span>International Platform for</span>
            <span>Import and Export</span>
          </p>
        </Link>
        <div className="input">
          <Search />
        </div>
        <div className="account">
          {auth ? (
            <div className="auth">
              <Link to={"/mypage/"} className="btn">
                Իմ էջը
              </Link>
              <Button text="Դուրս գալ" className="active" click={logout} />
            </div>
          ) : (
            <div className="no-auth">
              <Link to={"/log/"} className="btn active">
                Մուտք գործել
              </Link>
              <Link to={"/reg/"} className="btn">
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
