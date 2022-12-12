import React from "react";
import { Route, Switch } from "react-router-dom";

function MoviesCard({
  name,
  duration,
  image,
  trailerLink,
  onMovieLike,
  movie,
  isDeleteMovies,
  isLiked,
}) {

  
  let hour = Math.floor(duration / 60);
  let minutes = Math.floor(duration - hour * 60);

  function handleLikeClick() {
    onMovieLike(movie);
  }

  function handleDeleteClick() {
    isDeleteMovies(movie);
  }

 const cardLikeButtonClassName = `movie__button ${
  isLiked(movie) ? "movie__button_active" : ""
 }`;

//  useEffect(() => {

 
// }, []);
 

  return (
    <ul className="movie__item">
      <li>
        <a href={trailerLink} target="_blank" rel="noreferrer">
          <img className="movie__image" src={image} alt={name} />
        </a>
        <div className="movie__data">
          <p className="movie__name">{name}</p>
          <div className="movie__buttons">
            <Switch>
              <Route path="/movies">
                {isLiked(movie) ? (
                  <button
                    className={cardLikeButtonClassName}
                    type="button"
                    aria-label="Нравится"
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
    </ul>
  );
}

export default MoviesCard;
