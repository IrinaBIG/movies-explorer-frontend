import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  movies,
  handleFindMovieFromApi,
  isLoading,
  isChecked,
  isCheckbox,
  onSaveMovieLike,
  handleSearchCheckbox,
  handleCardLike,
  handleDeleteMovies,
  searchNameMovies,
  handleSwowMoreMovies,
  serverError,
  handleFiltredCheckbox,
}) {
  return (
    <main className="main">
      <SearchForm
        onSubmitHandler={handleFindMovieFromApi}
        isChecked={isChecked}
        isCheckbox={isCheckbox}
        handleSearchCheckbox={handleSearchCheckbox}
        searchNameMovies={searchNameMovies}
        handleFiltredCheckbox={handleFiltredCheckbox}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={movies}
          onSaveMovieLike={onSaveMovieLike}
          handleCardLike={handleCardLike}
          handleDeleteMovies={handleDeleteMovies}
          handleSwowMoreMovies={handleSwowMoreMovies}
          serverError={serverError}
          isChecked={isChecked}
        />
      )}
    </main>
  );
}

export default Movies;
