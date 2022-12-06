import React from "react";
import { Route } from "react-router-dom";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({movies, onMovieLike, savedMovies}) {
  console.log(movies);
  return (
    // console.log(movies);

    <section className="movies-list">
      <Route path="/movies">
       
      {movies.map((movie) => {
        return (
          <MoviesCard
            movie={movie}
            key={movie.id}
            name={movie.nameRU}
            image={`https://api.nomoreparties.co/${movie.image.url}`}
            id={movie.id}
            likes={movie.likes}
            duration={movie.duration}
            trailerLink={movie.trailerLink}
            onMovieLike={onMovieLike}
          />
        );
      })}
      </Route>

      <Route path="/saved-movies">
      {/* {savedMovies.map((movie) => {
        return (
          <MoviesCard
            movie={movie}
            key={movie.id}
            name={movie.nameRU}
            image={`https://api.nomoreparties.co/${movie.image.url}`}
            id={movie.id}
            likes={movie.likes}
            duration={movie.duration}
            trailerLink={movie.trailerLink}
            onMovieLike={onMovieLike}
          />
        );
      })} */}
      </Route>
    </section>
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