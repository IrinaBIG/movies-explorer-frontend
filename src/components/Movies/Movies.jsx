import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoreMovies from "../MoreMovies/MoreMovies";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  movies,
  onInput,
  handleFindMovieFromApi,
  isLoading,
  isChecked,
  isCheckbox,
  isSaveMovieLike,
  handleSearchCheckbox,
  isLiked,
  isDeleteMovies,
  serchNameMovies,
}) {
  // const moviesSearch = movies.length === 0;

  return (
    <main className="main">
      <SearchForm
        onInput={onInput}
        onSubmitHandler={handleFindMovieFromApi}
        isChecked={isChecked}
        isCheckbox={isCheckbox}
        handleSearchCheckbox={handleSearchCheckbox}
        serchNameMovies={serchNameMovies}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={movies}
          isSaveMovieLike={isSaveMovieLike}
          isLiked={isLiked}
          isDeleteMovies={isDeleteMovies}
        />
      )}

      <MoreMovies />
    </main>
  );
}

export default Movies;

// {isLoading
//   ? (<Preloader />)
//   : ({moviesSearch
//     ? (<h2 className="movies__text">Ничего не найдено</h2>)
//     : (<MoviesCardList movies={movies} onMovieLike={onMovieLike} /> )
//     })}
//  {/* {isLoading ? (
//       <Preloader />
//     ) : (
//       <MoviesCardList movies={movies} onMovieLike={onMovieLike} />
//     )} */}

// {isLoading ? (
//   <Preloader />
// ) : moviesSearch ? (
//   <h2 className="movies__text">Ничего не найдено</h2>
// ) : (
//   <MoviesCardList movies={movies} onMovieLike={onMovieLike} />
// )}
