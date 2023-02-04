import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  onSaveMovieLike,
  handleDeleteSavedMovies,
  handleCardLike,
  handleSwowMoreMovies,
  serverError,
  isChecked,
  handleDeleteMovies,
}) {
  const location = useLocation();
  // const [newArrMovies, setNewArrMovies] = useState([]);
  const moviesPatch = location.pathname === "/movies";
  const foundMovies = JSON.parse(localStorage.getItem("findMovies")) ?? "";

  console.log(movies);
  console.log(foundMovies);
  // const searchShortsMovies = (movies) => {
  //   return movies.filter((item) => item.duration <= 40);
  // };

  // useEffect(() => {
  //   const arr = isChecked ? searchShortsMovies(movies) : movies;
  //   setNewArrMovies(arr);
  //   // localStorage.setItem("findMovies", JSON.stringify(arr));
  // }, [isChecked, movies])
  
  // let newArrMovies = isChecked ? searchShortsMovies(movies) : movies;

  if ("allBeatfilmMovies" in localStorage && movies.length === 0)
    return <h2 className="movies__text">Ничего не найдено</h2>;

  return (
    <>
      {serverError && (
        <h2 className="movies__text">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </h2>
      )}
      <section className="movies-list">
        {movies.map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              key={movie.id || movie.movieId}
              isDeleteMovies={handleDeleteMovies || handleDeleteSavedMovies}
              handleCardLike={handleCardLike}
              onSaveMovieLike={onSaveMovieLike}
            />
          );
        })}
      </section>

      {moviesPatch ? (
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
      )}
    </>
  );
}

export default MoviesCardList;
