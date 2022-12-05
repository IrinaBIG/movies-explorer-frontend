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
}) {
  return (
    <main className="main">
      <SearchForm
        onInput={onInput}
        onSubmitHandler={handleFindMovieFromApi}
        isChecked={isChecked}
        isCheckbox={isCheckbox}
      />
      {/* <Suspense fallback={<Preloader />}>
        <MoviesCardList
        movies={movies}
        />
      </Suspense> */}

      {isLoading ? ( <Preloader /> ) : ( <MoviesCardList movies={movies} /> )}

      <MoreMovies />
    </main>
  );
}

export default Movies;
