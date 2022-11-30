import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreMovies from "../MoreMovies/MoreMovies";

function SavedMovies() {
  return (
    <main className="movies-content">
      <SearchForm />
      <MoviesCardList />
      <MoreMovies />
    </main>
  );
}

export default SavedMovies;
