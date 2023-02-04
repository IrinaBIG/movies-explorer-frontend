import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  isCheckedSave,
  onInput,
  isCheckbox,
  isLoading,
  movies,
  handleFindSavedMovie,
  isSavedMovies,
  handleDeleteSavedMovies,
  handleCardLike,
  searchSavedMovies,
  searchNameSavedMovies,
  searchMovies,
  handleFiltredCheckbox,
}) {
  return (
    <main className="main">
      <SearchForm
        onInput={onInput}
        handleFindSavedMovie={handleFindSavedMovie}
        isChecked={isCheckedSave}
        isCheckbox={isCheckbox}
        searchNameSavedMovies={searchNameSavedMovies}
        searchMovies={searchMovies}
        handleFiltredCheckbox={handleFiltredCheckbox}
      />

      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={movies}
          isSavedMovies={isSavedMovies}
          handleDeleteSavedMovies={handleDeleteSavedMovies}
          handleCardLike={handleCardLike}
          searchSavedMovies={searchSavedMovies}
          isChecked={isCheckedSave}
        />
      )}
    </main>
  );
}

export default SavedMovies;
