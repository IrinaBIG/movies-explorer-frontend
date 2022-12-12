import React from "react";
import { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  isSaveMovieLike,
  savedMovies,
  isDeleteMovies,
  isLiked,
  searchSavedMovies,
  search,
}) {
  // console.log(movies);
  // console.log(savedMovies);
  const location = useLocation();
  const moviesApi = location.pathname === "/movies";


  // const notSearch = search;

  // let savedMoviesBlock = notSearch ? searchSavedMovies : savedMovies; 
  // const findMovies = JSON.parse(localStorage.getItem("findMovies"))
  // const moviesSearch = findMovies.length === 0;
  // if (movies.length === 0) return <h2 className="movies__text">Ничего не найдено</h2>

  return (
     <>
    
         {/* <Switch>
          <Route exact path="/movies">
          <section className="movies-list">
            {movies.map((movie) => {
              return (
                <MoviesCard
                  movie={movie}
                  key={movie.id}
                  name={movie.nameRU}
                  image={`https://api.nomoreparties.co/${movie.image.url}`}
                  // id={movie.id}
                  likes={isLiked}
                  duration={movie.duration}
                  trailerLink={movie.trailerLink}
                  onMovieLike={isSaveMovieLike}
                  isDeleteMovies={isDeleteMovies}
                />
              );
            })}
            </section>
          </Route> 

         <Route path="/saved-movies">
          <section className="movies-list">
            {savedMovies.map((movie) => {
              return (
                <MoviesCard
                  key={movie.movieId}
                  movie={movie}
                  name={movie.nameRU}
                  // image={`https://api.nomoreparties.co/${movie.image}`}
                  image={movie.image}
                  // id={movie._id}
                  likes={isLiked}
                  duration={movie.duration}
                  trailerLink={movie.trailerLink}
                  onMovieLike={isSaveMovieLike}
                  isDeleteMovies={isDeleteMovies}
                />
              );
            })}
            </section>
          </Route> 
        </Switch> */}

        <section className="movies-list">
          {moviesApi 
          ? movies.map(movie => {
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

        {/* {moviesSearch ? <h2 className="movies__text">Ничего не найдено</h2> : ""}  */}
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
