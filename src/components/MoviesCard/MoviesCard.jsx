import React from "react";
import card from "../../images/card.svg";
import { Route, Switch } from "react-router-dom";

function MoviesCard() {
  return (
    <ul className="movie__item">
      <li>
        <img className="movie__image" src={card} alt="картинка фильма" />
        <div className="movie__data">
          <p className="movie__name">
            Gimme Danger: История Игги и The Stooges
          </p>
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
        <p className="movie__duration">1ч 42м</p>
      </li>
    </ul>
  );
}

export default MoviesCard;
