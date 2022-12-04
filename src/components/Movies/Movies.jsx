import React, { Suspense, lazy, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoreMovies from "../MoreMovies/MoreMovies";
import Preloader from "../Preloader/Preloader";
// import moviesApi from "../../utils/MoviesApi"


const MoviesCardList = lazy(() => import("../MoviesCardList/MoviesCardList"));


function Movies({ movies, onInput, onSubmitHandler}) {

  return (
    <main className="main">
      <SearchForm 
      onInput={onInput}
      onSubmitHandler={onSubmitHandler}
      />
      <Suspense fallback={<Preloader />}>
        <MoviesCardList
        movies={movies}
        />
      </Suspense>
      <MoreMovies />
    </main>
  );
}

export default Movies;
