import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import MoreMovies from "../MoreMovies/MoreMovies";

function SavedMovies({ movies, onInput, onSubmitHandler }) {
  return (
    <main className="main">
      <SearchForm onInput={onInput} onSubmitHandler={onSubmitHandler} />
      {/* <MoviesCardList movies={movies} /> */}
      {/* <MoreMovies /> */}
    </main>
  );
}

export default SavedMovies;
