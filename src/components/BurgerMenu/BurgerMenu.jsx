import React from "react";
import { Link, NavLink } from "react-router-dom";

function BurgerMenu({ isOpen, isClose }) {
  return (
    <section className={`burger-menu ${isOpen && "burger-menu_is-active"}`}>
      <div className="burger-menu__content">
        <button
          type="button"
          className="burger__closeBtn"
          onClick={isClose}
        ></button>
        <nav className="burger__links">
          <NavLink
            exact
            to="/"
            activeClassName="burger__link-active"
            className="burger__link"
          >
            Главная
          </NavLink>

          <NavLink
            to="/movies"
            activeClassName="burger__link-active"
            className="burger__link"
          >
            Фильмы
          </NavLink>

          <NavLink
            to="/saved-movies"
            activeClassName="burger__link-active"
            className="burger__link"
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to="/profile">
          <button type="button" className="burger__profileBtn"></button>
        </Link>
      </div>
    </section>
  );
}

export default BurgerMenu;
