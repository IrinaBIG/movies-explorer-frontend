import React from "react";
// import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import MoreMovies from "../MoreMovies/MoreMovies";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  isSaveMovieLike,
  savedMovies,
  isDeleteMovies,
  isLiked,
  searchSavedMovies,
  search,
  handleSwowMoreMovies,
  serverError,
}) {
  // console.log(movies);
  // console.log(savedMovies);
  const location = useLocation();
  const moviesApi = location.pathname === "/movies";

  const foundMovies = JSON.parse(localStorage.getItem("findMovies"));




  const moviesSearch = foundMovies.length === 0;


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
                  // id={movie.id}
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
                  // image={`https://api.nomoreparties.co/${movie.image}`}
                  image={movie.image}
                  // id={movie._id}
                  isLiked={isLiked}
                  duration={movie.duration}
                  trailerLink={movie.trailerLink}
                  onMovieLike={isSaveMovieLike}
                  isDeleteMovies={isDeleteMovies}
                />
              );
            })}
      </section>

      {moviesApi ? (
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

      {moviesSearch ? <h2 className="movies__text">Ничего не найдено</h2> : ""}
    
    </>
  );
}

export default MoviesCardList;

// import React from "react";

// import MoviesCard from "../MoviesCard/MoviesCard";

// function MoviesCardList({movies, onMovieLike}) {

//   return (

//     <section className="movies-list">
//       {movies.slice(0, 16).map((movie) => {
//         return (
//           <MoviesCard
//             movie={movie}
//             key={movie.id}
//             name={movie.nameRU}
//             link={`https://api.nomoreparties.co/${movie.image.url}`}
//             id={movie.id}
//             likes={movie.likes}
//             duration={movie.duration}
//             trailerLink={movie.trailerLink}
//             onMovieLike={onMovieLike}
//           />
//         );
//       })}
//     </section>
//   );
// }

// export default MoviesCardList;
