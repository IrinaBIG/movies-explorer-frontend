import React, { Suspense, lazy } from 'react';
import SearchForm from '../SearchForm/SearchForm';
// import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import Preloader from '../Preloader/Preloader';
const MoviesCardList = lazy(() => import('../MoviesCardList/MoviesCardList'));

function Movies() {
  return (
    <div className="movies-content">
      {/* <Preloader /> */}
      <SearchForm />
      <Suspense fallback={<Preloader />}>
        <MoviesCardList />
      </Suspense>
      <MoreMovies />
    </div>
  );
}

export default Movies;