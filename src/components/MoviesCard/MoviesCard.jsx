import React from "react";
// import card from "../../images/card.svg";
import { Route, Switch } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard({ name, duration, image, trailerLink, onMovieLike, movie }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = movie.likes.some((item) => item._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `movie__button $"movie__button_active"}`;

  let hour = Math.floor(duration / 60);
  let minutes = Math.floor(duration - hour * 60);

  function handleLikeClick (movie) {
    onMovieLike(movie);
}


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
                <button
                  // className={cardLikeButtonClassName}
                  className="movie__button"
                  type="button"
                  aria-label="Нравится"
                  onClick={handleLikeClick}
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
        <p className="movie__duration">{hour}ч {minutes}м </p>
        {/* <p className="movie__duration">{duration}</p> */}
      </li>
    </ul>
  );
}

export default MoviesCard;
