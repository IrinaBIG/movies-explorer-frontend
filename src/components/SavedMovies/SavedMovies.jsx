import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";


function SavedMovies({ movies, onInput, onSubmitHandler, isLoading, savedMovies }) {
  return (
    <main className="main">
      <SearchForm onInput={onInput} onSubmitHandler={onSubmitHandler} />
      {/* <MoviesCardList movies={movies} /> */}
      {isLoading ? ( <Preloader /> ) : ( <MoviesCardList savedMovies={savedMovies}  /> )}
    </main>
  );
}

export default SavedMovies;
