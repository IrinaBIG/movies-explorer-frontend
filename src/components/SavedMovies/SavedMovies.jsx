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
  isSavedMovies,
  isDeleteMovies,
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
        <MoviesCardList
          savedMovies={savedMovies}
          isSavedMovies={isSavedMovies}
          isDeleteMovies={isDeleteMovies}
        />
      )}
    </main>
  );
}

export default SavedMovies;
