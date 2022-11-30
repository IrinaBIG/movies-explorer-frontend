import React, { Suspense, lazy } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoreMovies from "../MoreMovies/MoreMovies";
import Preloader from "../Preloader/Preloader";
const MoviesCardList = lazy(() => import("../MoviesCardList/MoviesCardList"));

function Movies() {
  return (
    <main className="main">
      <SearchForm />
      <Suspense fallback={<Preloader />}>
        <MoviesCardList />
      </Suspense>
      <MoreMovies />
    </main>
  );
}

export default Movies;
