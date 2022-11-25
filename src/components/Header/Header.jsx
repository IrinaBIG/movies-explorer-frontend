import React from "react";
import headerLogo from "../../images/logo.svg";
import profile from "../../images/profile.svg";
import { Link, Route, Switch, NavLink } from "react-router-dom";

function Header() {
  return (
    <Switch>
      <Route exact path="/">
        <div className="header header_dark-theme">
          <Link to="/" className="header__logo">
            <img className="logo" src={headerLogo} alt="логотип Mesto" />
          </Link>

          <Link to="/sign-up" className="header__link header__link_dark-theme">
            Регистрация
          </Link>

          <Link to="/sign-in" className="header__links">
            <button className="header__link-login" type="button">
              Войти
            </button>
          </Link>
        </div>
      </Route>

      <Route path="/sign-in">
        <div className="header header__place_login">
          <Link to="/" className="header__logo">
            <img className="logo" src={headerLogo} alt="логотип Mesto" />
          </Link>
        </div>
      </Route>

      <Route path="/sign-up">
        <div className="header header__place_login">
          <Link to="/" className="header__logo">
            <img className="logo" src={headerLogo} alt="логотип Mesto" />
          </Link>
        </div>
      </Route>

      <Route path="/movies">
        <div className="header">
          <NavLink to="/" className="header__logo">
            <img className="logo" src={headerLogo} alt="логотип Mesto" />
          </NavLink>

          <NavLink
            to="/movies"
            activeClassName="link-active"
            className="header__link header__link_movies"
          >
            Фильмы
          </NavLink>

          <NavLink
            to="/saved-movies"
            activeClassName="link-active"
            className="header__link header__link_save"
          >
            Сохранённые фильмы
          </NavLink>

          <NavLink to="/profile" className="header__link header__link_profile">
            <img src={profile} alt="Ссылка на профиль" />
          </NavLink>
        </div>
      </Route>

      <Route path="/saved-movies">
        <div className="header">
          <NavLink to="/" className="header__logo">
            <img className="logo" src={headerLogo} alt="логотип Mesto" />
          </NavLink>

          <NavLink
            to="/movies"
            activeClassName="link-active"
            className="header__link header__link_movies"
          >
            Фильмы
          </NavLink>

          <NavLink
            to="/saved-movies"
            activeClassName="link-active"
            className="header__link header__link_save"
          >
            Сохранённые фильмы
          </NavLink>

          <NavLink to="/profile" className="header__link header__link_profile">
            <img src={profile} alt="Ссылка на профиль" />
          </NavLink>
        </div>
      </Route>

      <Route path="/profile">
        <div className="header">
          <NavLink to="/" className="header__logo">
            <img className="logo" src={headerLogo} alt="логотип Mesto" />
          </NavLink>

          <NavLink
            to="/movies"
            activeClassName="link-active"
            className="header__link header__link_movies"
          >
            Фильмы
          </NavLink>

          <NavLink
            to="/saved-movies"
            activeClassName="link-active"
            className="header__link header__link_save"
          >
            Сохранённые фильмы
          </NavLink>

          <NavLink to="/profile" className="header__link header__link_profile">
            <img src={profile} alt="Ссылка на профиль" />
          </NavLink>
        </div>
      </Route>

      <Route path="*"></Route>
    </Switch>
  );
}

export default Header;
