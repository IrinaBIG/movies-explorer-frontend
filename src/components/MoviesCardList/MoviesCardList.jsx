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
  // console.log(movies);
  // console.log(savedMovies);
  const location = useLocation();
  const moviesApi = location.pathname === "/movies";
  const foundMovies = JSON.parse(localStorage.getItem("findMovies")) ?? '';
  // const moviesSearch = {if ("findMovies" in localStorage) { foundMovies.length === 0}};

  console.log(searchSavedMovies);
  console.log(savedMovies);
  // if (movies === null) {
  //   return;
  // }

  return (
    <>
      {serverError && (
        <h2 className="movies__text">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </h2>
      )}
      <section className="movies-list">
        {moviesApi ? (
          movies.length === 0 ? (
            <h2 className="movies__text">Ничего не найдено</h2>
          ) : (
            movies.map((movie) => {
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
          )
        ) : (savedMovies.length === 0 ) ? (
          <h2 className="movies__text">Ничего не найдено</h2>
        ) : (
          ((searchSavedMovies) ? searchSavedMovies.map((movie) => {
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
            )})
        ))}
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

      {/* {moviesApi ? (
        moviesSearch ? (
          <h2 className="movies__text">Ничего не найдено</h2>
        ) : (
          ""
        )
      ) : (
        ""
      )} */}
    </>
  );
}

export default MoviesCardList;

//
// import React from "react";
// // import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import MoviesCard from "../MoviesCard/MoviesCard";

// function MoviesCardList({
//   movies,
//   isSaveMovieLike,
//   savedMovies,
//   isDeleteMovies,
//   isLiked,
//   searchSavedMovies,
//   handleSwowMoreMovies,
//   serverError,
// }) {

//   // console.log(movies);
//   // console.log(savedMovies);
//   const location = useLocation();
//   const moviesApi = location.pathname === "/movies";
//   const foundMovies = JSON.parse(localStorage.getItem("findMovies"));
//   const moviesSearch = foundMovies.length === 0;
//   console.log(searchSavedMovies)

//   return (
//     <>
//       {serverError && (
//         <h2 className="movies__text">
//           Во время запроса произошла ошибка. Возможно, проблема с соединением
//           или сервер недоступен. Подождите немного и попробуйте ещё раз
//         </h2>
//       )}
//       <section className="movies-list">
//         {moviesApi
//           ? movies.map((movie) => {
//               return (
//                 <MoviesCard
//                   movie={movie}
//                   key={movie.id}
//                   name={movie.nameRU}
//                   image={`https://api.nomoreparties.co/${movie.image.url}`}
//                   isLiked={isLiked}
//                   duration={movie.duration}
//                   trailerLink={movie.trailerLink}
//                   onMovieLike={isSaveMovieLike}
//                   isDeleteMovies={isDeleteMovies}
//                 />
//               );
//             })
//           : (!searchSavedMovies
//             ? (savedMovies.map((movie) => {
//               return (
//                 <MoviesCard
//                   key={movie.movieId}
//                   movie={movie}
//                   name={movie.nameRU}
//                   image={movie.image}
//                   isLiked={isLiked}
//                   duration={movie.duration}
//                   trailerLink={movie.trailerLink}
//                   onMovieLike={isSaveMovieLike}
//                   isDeleteMovies={isDeleteMovies}
//                 />
//               );
//             }))
//             : (searchSavedMovies.map((movie) => {
//               return (
//                 <MoviesCard
//                   key={movie.movieId}
//                   movie={movie}
//                   name={movie.nameRU}
//                   image={movie.image}
//                   isLiked={isLiked}
//                   duration={movie.duration}
//                   trailerLink={movie.trailerLink}
//                   onMovieLike={isSaveMovieLike}
//                   isDeleteMovies={isDeleteMovies}
//                 />
//             )})))
//             }
//       </section>

//       {moviesApi ? (
//         movies.length < foundMovies.length ? (
//           <button
//             type="button"
//             className="more-movies__button"
//             onClick={handleSwowMoreMovies}
//           >
//             Ещё
//           </button>
//         ) : (
//           ""
//         )
//       ) : (
//         ""
//       )}

//       {moviesApi ? (
//         moviesSearch ? (
//           <h2 className="movies__text">Ничего не найдено</h2>
//         ) : (
//           ""
//         )
//       ) : (
//         ""
//       )}
//     </>
//   );
// }

// export default MoviesCardList;
