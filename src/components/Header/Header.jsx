import React, { useEffect } from "react";
import "./Header.scss";
import Search from "../../ui/inputs/Search/Search";
import { Link, Outlet } from "react-router-dom";
import checkAuth from "../../checkAuth";
import Button from "../../ui/Button/Button";
import { useNavigate } from "react-router-dom";

export default function Header({ search = false, searchProduct }) {
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
          <img src="/logo192.png" alt="No img" />
          <p>
            <span>International Platform for</span>
            <span>Import and Export</span>
          </p>
        </Link>
        {search ? (
          <div className="container">
            <Search searchProduct={searchProduct} />
          </div>
        ) : (
          <></>
        )}
        <div className="account">
          {auth ? (
            <div className="auth">
              <Link to={"/mypage/"} className="btn">
                Իմ էջը
              </Link>
              <Button
                text="Դուրս գալ"
                className="active media"
                click={logout}
              />
            </div>
          ) : (
            <div className="no-auth">
              <Link to={"/log/"} className="btn active media">
                Մուտք գործել
              </Link>
              <Link to={"/reg/"} className="btn media">
                Գրանցվել
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="container mobile">
        <Link to={"/"} className="logo">
          <img src="/logo192.png" alt="No img" />
          <p className="name">
            <span>International Platform for</span>
            <span>Import and Export</span>
          </p>
          <p className="attr">IPIEX</p>
        </Link>
        <div className="account">
          {auth ? (
            <div className="auth">
              <Link to={"/mypage/"} className="btn media">
                Իմ էջը
              </Link>
              <Button
                text="Դուրս գալ"
                className="active media"
                click={logout}
              />
            </div>
          ) : (
            <div className="no-auth">
              <Link to={"/log/"} className="btn active media">
                Մուտք գործել
              </Link>
              <Link to={"/reg/"} className="btn media">
                Գրանցվել
              </Link>
            </div>
          )}
        </div>
      </div>
      {search ? (
        <div className="input container">
          <Search searchProduct={searchProduct} />
        </div>
      ) : (
        <></>
      )}

      <Outlet />
    </header>
  );
}
