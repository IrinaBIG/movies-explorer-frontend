import React from "react";
// import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  isSaveMovieLike,
  savedMovies,
  isDeleteMovies,
  isLiked,
  searchSavedMovies,
  handleSwowMoreMovies,
  serverError,
}) {

  console.log(movies);
  console.log(savedMovies);
  const location = useLocation();
  const moviesApi = location.pathname === "/movies";
  // const foundMovies = JSON.parse(localStorage.getItem("findMovies"));
  // const moviesSearch = foundMovies.length === 0;

  return (
    <>
      {serverError && (
        <h2 className="movies__text">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </h2>
      )}
      <section className="movies-list">
        {moviesApi
          ? movies.map((movie) => {
              return (
                <MoviesCard
                  movie={movie}
                  key={movie.id}
                  name={movie.nameRU}
                  image={`https://api.nomoreparties.co/${movie.image.url}`}
                  isLiked={isLiked}
                  duration={movie.duration}
                  trailerLink={movie.trailerLink}
                  onMovieLike={isSaveMovieLike}
                  isDeleteMovies={isDeleteMovies}
                />
              );
            })
          : savedMovies.map((movie) => {
              return (
                <MoviesCard
                  key={movie.movieId}
                  movie={movie}
                  name={movie.nameRU}
                  image={movie.image}
                  isLiked={isLiked}
                  duration={movie.duration}
                  trailerLink={movie.trailerLink}
                  onMovieLike={isSaveMovieLike}
                  isDeleteMovies={isDeleteMovies}
                />
              );
            })}
      </section>

      {/* {moviesApi ? (
        movies.length < foundMovies.length ? (
          <button
            type="button"
            className="more-movies__button"
            onClick={handleSwowMoreMovies}
          >
            Ещё
          </button>
        ) : (
          ""
        )
      ) : (
        ""
      )} */}

      {/* {moviesSearch ? <h2 className="movies__text">Ничего не найдено</h2> : ""} */}
    </>
  );
}

export default MoviesCardList;
