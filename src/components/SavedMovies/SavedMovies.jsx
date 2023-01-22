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
  handleFindSavedMovie,
  isSavedMovies,
  isDeleteMovies,
  isLiked,
  searchSavedMovies,
  handleGetAllSavedMovies,
  searchNameSavedMovies,
  // search
}) {
  return (
    <main className="main">
      <SearchForm
        onInput={onInput}
        handleFindSavedMovie={handleFindSavedMovie}
        isChecked={isChecked}
        isCheckbox={isCheckbox}
        searchNameSavedMovies={searchNameSavedMovies}
      />

      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          savedMovies={savedMovies}
          isSavedMovies={isSavedMovies}
          isDeleteMovies={isDeleteMovies}
          isLiked={isLiked}
          searchSavedMovies={searchSavedMovies}
          // handleGetAllSavedMovies={handleGetAllSavedMovies}
          // search={search}
        />
      )}
    </main>
  );
}

export default SavedMovies;
