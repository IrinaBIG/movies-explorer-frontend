import React, { useMemo, useState } from "react";
import loupe from "../../images/loupe.svg";
import separator from "../../images/inputSeparator.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";

function SearchForm({
  onSubmitHandler,
  isChecked,
  isCheckbox,
  handleFindSavedMovie,
  handleSearchCheckbox,
  searchNameMovies,
  searchNameSavedMovies,
  handleFiltredCheckbox,
}) {
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState("");

  const location = useLocation();
  const savedMoviesPatch = location.pathname === "/saved-movies";

  function handleChangeInput(e) {
    setValue(e.target.value);
  }

  function handleSubmitMovies(e) {
    e.preventDefault();
    if (value === null) {
      setErrors("Нужно ввести ключевое слово");
      setTimeout(setErrors, 1000);
      return;
    }
    if (value.length === 0) {
      setErrors("Нужно ввести ключевое слово");
      setTimeout(setErrors, 1000);
      return;
    }
    onSubmitHandler(value);
  }

  function handleSubmitSavedMovies(e) {
    e.preventDefault();
    if (value === null) {
      setErrors("Нужно ввести ключевое слово");
      setTimeout(setErrors, 1000);
      return;
    }
    if (value.length === 0) {
      setErrors("Нужно ввести ключевое слово");
      setTimeout(setErrors, 1000);
      return;
    }
    handleFindSavedMovie(value);
  }

  useMemo(() => {
    if (!savedMoviesPatch) {
      setValue(searchNameMovies);
    } else {
      setValue(searchNameSavedMovies);
    }
  }, [savedMoviesPatch, searchNameMovies, searchNameSavedMovies]);

  return (
    <section className="search">
      <form
        className="search__movies"
        onSubmit={
          savedMoviesPatch ? handleSubmitSavedMovies : handleSubmitMovies
        }
        noValidate
      >
        <img
          src={loupe}
          alt="декоративный элемент - лупа"
          className="search__input-loupe"
        />
        <input
          type="text"
          className="search__input"
          placeholder="Фильм"
          name="searchInput"
          id="search-input"
          required
          onChange={handleChangeInput}
          defaultValue={value}
        />
        {errors && <span className="search__span">{errors}</span>}
        <button type="submit" className="search__input-find"></button>
        <img
          src={separator}
          alt="декоративный элемент - разделитель"
          className="search__input-separator"
        />
        <FilterCheckbox
          isChecked={isChecked}
          isCheckbox={isCheckbox}
          handleSearchCheckbox={handleSearchCheckbox}
          handleFiltredCheckbox={handleFiltredCheckbox}
        />
        <h3 className="search__short-movies">Короткометражки</h3>
      </form>
    </section>
  );
}

export default SearchForm;
