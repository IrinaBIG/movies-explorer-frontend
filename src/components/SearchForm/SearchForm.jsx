import React from "react";
import loupe from "../../images/loupe.svg";
import separator from "../../images/inputSeparator.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onInput, onSubmitHandler, isChecked, isCheckbox }) {

  // function handleInput(evt) {
  //   onInput(evt.target.value);
  // }

  return (
    <section className="search">
      <form className="search__movies" onSubmit={onSubmitHandler}>
        <img
          src={loupe}
          alt="декоративный элемент - лупа"
          className="search__input-loupe"
        />
        <input
          type="text"
          className="search__input"
          placeholder="Фильм"
          required
          onInput={onInput}
        />
        <button 
        type="submit" 
        className="search__input-find"
        // onClick={onInput}
        >
        </button>
        <img
          src={separator}
          alt="декоративный элемент - разделитель"
          className="search__input-separator"
        />      
        <FilterCheckbox 
        isChecked={isChecked}
        isCheckbox={isCheckbox}
        />
        <h3 className="search__short-movies">Короткометражки</h3>
      </form>
    </section>
  );
}

export default SearchForm;
