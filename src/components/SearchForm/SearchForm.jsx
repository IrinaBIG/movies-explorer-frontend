import React from "react";
import loupe from "../../images/loupe.svg";
// import find from "../../images/find.svg";
import separator from "../../images/inputSeparator.svg";

function SearchForm() {
  return (
    <section className="search">
      <div className="search__movies">
        <img
          src={loupe}
          alt="декоративный элемент - лупа"
          className="search__input-loupe"
        />
        <input
          type="text"
          className="search__input"
          placeholder="Фильм"
        />
        <button type="button" className="search__input-find"></button>
        {/* <img src={find} alt="картинка поиска" className="search__input-find" /> */}
        <img
          src={separator}
          alt="декоративный элемент - разделитель"
          className="search__input-separator"
        />
        <div className="search__input-tumb"></div>
        <h3 className="search__short-movies">Короткометражки</h3>
      </div>
    </section>
  );
}

export default SearchForm;
