import React from "react";
import { useLocation } from "react-router-dom";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, onMovieLike, savedMovies, isSavedMovies,isDeleteMovies }) {
  console.log(movies);
  console.log(savedMovies);
  const location = useLocation();
  const moviesApi = location.pathname === "/movies";
  // const findMovies = JSON.parse(localStorage.getItem("findMovies"))
  // const moviesSearch = findMovies.length === 0;
  // if (movies.length === 0) return <h2 className="movies__text">Ничего не найдено</h2>

  return (
    <>
      <section className="movies-list">
        {moviesApi
          ? movies.map(movie => {
              return (
                <MoviesCard
                  movie={movie}
                  key={movie._id}
                  name={movie.nameRU}
                  image={`https://api.nomoreparties.co/${movie.image.url}`}
                  id={movie.id}
                  likes={movie.likes}
                  duration={movie.duration}
                  trailerLink={movie.trailerLink}
                  onMovieLike={onMovieLike}
                />
              );
            })
          : savedMovies.map((movie) => {
              return (
                <MoviesCard
                  key={movie.movieId}
                  movie={movie}
                  name={movie.nameRU}
                  image={`https://api.nomoreparties.co/${movie.image.url}`}
                  // image={movie.image}
                  id={movie._id}
                  duration={movie.duration}
                  trailerLink={movie.trailerLink}
                  isDeleteMovies={isDeleteMovies}
                />
              );
            })}
      </section>

      {/* {moviesSearch ? <h2 className="movies__text">Ничего не найдено</h2> : ""} */}
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
