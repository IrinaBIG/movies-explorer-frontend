import React from "react";
// import React, { Suspense, lazy, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoreMovies from "../MoreMovies/MoreMovies";
import Preloader from "../Preloader/Preloader";
// import moviesApi from "../../utils/MoviesApi"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// const MoviesCardList = lazy(() => import("../MoviesCardList/MoviesCardList"));

function Movies({
  movies,
  onInput,
  handleFindMovieFromApi,
  isLoading,
  isChecked,
  isCheckbox,
  onMovieLike,
}) {
  return (
    <main className="main">
      <SearchForm
        onInput={onInput}
        onSubmitHandler={handleFindMovieFromApi}
        isChecked={isChecked}
        isCheckbox={isCheckbox}
      />

      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList movies={movies} onMovieLike={onMovieLike} />
      )}

      <MoreMovies />
    </main>
  );
}

export default Movies;
