import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  isChecked,
  onInput,
  isCheckbox,
  onSubmitHandler,
  isLoading,
  savedMovies,
  handleFindMovieFromApi,
}) {
  return (
    <main className="main">
      <SearchForm
        onInput={onInput}
        onSubmitHandler={handleFindMovieFromApi}
        isChecked={isChecked}
        isCheckbox={isCheckbox}
      />

      {isLoading ? <Preloader /> : <MoviesCardList savedMovies={savedMovies} />}
      
    </main>
  );
}

export default SavedMovies;
