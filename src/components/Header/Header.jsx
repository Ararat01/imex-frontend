import React, { useEffect } from "react";
import "./Header.scss";
import Search from "../../ui/inputs/Search/Search";
import { Link, Outlet, useParams } from "react-router-dom";
import checkAuth from "../../checkAuth";
import Button from "../../ui/Button/Button";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "./../../ui/LangSwitcher/LangSwitcher";
import { useTranslation } from "react-i18next";

export default function Header({ search = false, searchProduct }) {
  const auth = checkAuth();
  const navigate = useNavigate();
  const { ln } = useParams();
  const { t } = useTranslation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate(`/${ln}/log`);
  };

  return (
    <header>
      <div className="container head">
        <Link to={`/${ln}`} className="logo">
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
              <LanguageSwitcher />
              <Link to={`/${ln}/mypage`} className="btn">
                {t("myPage")}
              </Link>
              <Button
                text={t("logout")}
                className="active media"
                click={logout}
              />
            </div>
          ) : (
            <div className="no-auth">
              <LanguageSwitcher />
              <Link to={`/${ln}/log`} className="btn active media">
                {t("login")}
              </Link>
              <Link to={`/${ln}/reg`} className="btn media">
                {t("register")}
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
              <LanguageSwitcher />
              <Link to={`/${ln}/mypage`} className="btn media">
                {t("myPage")}
              </Link>
              <Button
                text={t("logout")}
                className="active media"
                click={logout}
              />
            </div>
          ) : (
            <div className="no-auth">
              <LanguageSwitcher />
              <Link to={`/${ln}/log`} className="btn active media">
                Մուտք գործել
              </Link>
              <Link to={`/${ln}/reg`} className="btn media">
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
