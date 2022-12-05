import React from "react";
// import card from "../../images/card.svg";
import { Route, Switch } from "react-router-dom";

function MoviesCard({ name, duration, link, trailerLink }) {
  return (
    <ul className="movie__item">
      <li>
        <a href={trailerLink} target="_blank" rel="noreferrer">
          <img className="movie__image" src={link} alt={name} />
        </a>
        <div className="movie__data">
          <p className="movie__name">{name}</p>
          <div className="movie__buttons">
            <Switch>
              <Route path="/movies">
                <button
                  className="movie__button"
                  type="button"
                  aria-label="Нравится"
                ></button>
              </Route>
              <Route path="/saved-movies">
                <button
                  className="movie__button movie__button_delete"
                  type="button"
                  aria-label="Удалить"
                ></button>
              </Route>
            </Switch>
          </div>
        </div>
        <p className="movie__duration">{duration}</p>
      </li>
    </ul>
  );
}

export default MoviesCard;
