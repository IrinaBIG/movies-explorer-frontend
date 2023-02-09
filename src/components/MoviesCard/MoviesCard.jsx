import React from "react";
import { Route, Switch } from "react-router-dom";

function MoviesCard({
  onSaveMovieLike,
  movie,
  isDeleteMovies,
  handleCardLike,
}) {
  let hour = Math.floor(movie.duration / 60);
  let minutes = Math.floor(movie.duration - hour * 60);

  const cardLikeButtonClassName = `movie__button ${
    handleCardLike(movie) ? "movie__button_active" : ""
  }`;

  function handleLikeClick() {
    onSaveMovieLike(movie);
  }

  function handleDeleteClick() {
    isDeleteMovies(movie);
  }

  return (
      <li className="movie__item">
        <a href={movie.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="movie__image"
            src={
              movie.thumbnail ||
              `https://api.nomoreparties.co/${movie.image.url}`
            }
            alt={movie.nameRU}
          />
        </a>
        <div className="movie__data">
          <p className="movie__name">{movie.nameRU}</p>
          <div className="movie__buttons">
            <Switch>
              <Route path="/movies">
                {handleCardLike(movie) ? (
                  <button
                    className={cardLikeButtonClassName}
                    type="button"
                    aria-label="Дизлайк"
                    onClick={handleDeleteClick}
                  ></button>
                ) : (
                  <button
                    className={cardLikeButtonClassName}
                    type="button"
                    aria-label="Нравится"
                    onClick={handleLikeClick}
                  ></button>
                )}
              </Route>
              <Route path="/saved-movies">
                <button
                  className="movie__button movie__button_delete"
                  type="button"
                  aria-label="Удалить"
                  onClick={handleDeleteClick}
                ></button>
              </Route>
            </Switch>
          </div>
        </div>
        <p className="movie__duration">
          {hour}ч {minutes}м
        </p>
      </li>
  );
}

export default MoviesCard;
