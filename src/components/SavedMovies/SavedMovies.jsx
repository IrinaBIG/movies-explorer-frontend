import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreMovies from "../MoreMovies/MoreMovies";

function SavedMovies() {
  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList />
      <MoreMovies />
    </main>
  );
}

export default SavedMovies;
