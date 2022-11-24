import React from "react";
import headerLogo from "../../images/logo.svg";
import profile from "../../images/profile.svg";
import { Link, Route, Switch } from "react-router-dom";

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
            <button className="header__link-exit" type="button">
              Войти
            </button>
          </Link>
        </div>
      </Route>

      <Route path="/sign-in">
        <div className="header">
          <Link to="/" className="header__logo">
            <img
              className="logo logo__login"
              src={headerLogo}
              alt="логотип Mesto"
            />
          </Link>
        </div>
      </Route>

      <Route path="/sign-up">
        <div className="header">
          <Link to="/" className="header__logo">
            <img
              className="logo logo__login"
              src={headerLogo}
              alt="логотип Mesto"
            />
          </Link>
        </div>
      </Route>

      <Route path="/">
        <div className="header">
          <Link to="/" className="header__logo">
            <img className="logo" src={headerLogo} alt="логотип Mesto" />
          </Link>

          <Link to="/movies" className="header__link header__link_movies">
            Фильмы
          </Link>

          <Link to="/saved-movies" className="header__link header__link_save">
            Сохранённые фильмы
          </Link>

          <Link to="/profile" className="header__link header__link_profile">
            <img src={profile} alt="Ссылка на профиль" />
          </Link>

          <Route path="*"></Route>
          
        </div>
      </Route>
    </Switch>
  );
}

export default Header;
