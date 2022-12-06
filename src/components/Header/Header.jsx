import React from "react";
import { useState } from "react";
import headerLogo from "../../images/logo.svg";
import profile from "../../images/profile.svg";
import { Link, Route, Switch, NavLink } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Header() {

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  function handleBurgerMenuClick() {
    setIsBurgerMenuOpen(true);
  }

  function closeBurgerMenu() {
    setIsBurgerMenuOpen(false);
  }

  return (
    <Switch>
      <Route exact path="/">
        <header className="header header_dark-theme">
          <Link to="/" className="header__logo">
            <img className="logo" src={headerLogo} alt="логотип" />
          </Link>

          <div className="header__navigate">
            <Link
              to="/signup"
              className="header__link header__link_dark-theme"
            >
              Регистрация
            </Link>
            <Link to="/signin" className="header__links">
              <button className="header__link-login" type="button">
                Войти
              </button>
            </Link>
          </div>
        </header>
      </Route>

      <Route path="/signin">
        <header className="header header__place_login">
          <Link to="/" className="header__logo">
            <img className="logo" src={headerLogo} alt="логотип" />
          </Link>
        </header>
      </Route>

      <Route path="/signup">
        <header className="header header__place_login">
          <Link to="/" className="header__logo">
            <img className="logo" src={headerLogo} alt="логотип" />
          </Link>
        </header>
      </Route>

      <Route path="/movies">
        <header className="header">
          <div className="header__movies">
            <NavLink to="/" className="header__logo">
              <img className="logo" src={headerLogo} alt="логотип" />
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
          </div>

          <NavLink to="/profile" className="header__link_profile">
            <img
              src={profile}
              alt="Ссылка на профиль"
              className="header__link_profile-image"
            />
          </NavLink>
     
          <button onClick={handleBurgerMenuClick} className="header__burger">
            <span></span>
          </button>
          <BurgerMenu isOpen={isBurgerMenuOpen} isClose={closeBurgerMenu} />
        </header>
      </Route>

      <Route path="/saved-movies">
        <header className="header">
          <div className="header__movies">
            <NavLink to="/" className="header__logo">
              <img className="logo" src={headerLogo} alt="логотип" />
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
          </div>

          <NavLink to="/profile" className="header__link_profile">
            <img
              src={profile}
              alt="Ссылка на профиль"
              className="header__link_profile-image"
            />
          </NavLink>

          <button onClick={handleBurgerMenuClick} className="header__burger">
            <span></span>
          </button>
          <BurgerMenu isOpen={isBurgerMenuOpen} isClose={closeBurgerMenu} />
        </header>
      </Route>

      <Route path="/profile">
        <header className="header">
          <div className="header__movies">
            <NavLink to="/" className="header__logo">
              <img className="logo" src={headerLogo} alt="логотип" />
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
          </div>

          <NavLink to="/profile" className="header__link_profile">
            <img
              src={profile}
              alt="Ссылка на профиль"
              className="header__link_profile-image"
            />
          </NavLink>

          <button onClick={handleBurgerMenuClick} className="header__burger">
            <span></span>
          </button>
          <BurgerMenu isOpen={isBurgerMenuOpen} isClose={closeBurgerMenu} />
        </header>
      </Route>

      <Route path="*"></Route>
    </Switch>
  );
}

export default Header;
