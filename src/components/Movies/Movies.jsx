import React from "react";
import SearchForm from "../SearchForm/SearchForm";
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
  handleSwowMoreMovies,
  serverError,
}) {
  
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
          handleSwowMoreMovies={handleSwowMoreMovies}
          serverError={serverError}
        />
      )}
    </main>
  );
}

export default Movies;