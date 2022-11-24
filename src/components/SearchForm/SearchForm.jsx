import React from "react";
import loupe from "../../images/loupe.svg";
import find from "../../images/find.svg";
import separator from "../../images/inputSeparator.svg";
// import tumb from "../../images/smalltumb.svg";

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
          // type="search"
          className="search__input"
          placeholder="Фильм"
        />
        <img src={find} alt="картинка поиска" className="search__input-find" />
        <img
          src={separator}
          alt="декоративный элемнт - разделитель"
          className="search__input-separator"
        />
        <div className="search__input-tumb"></div>
        {/* <img src={tumb} alt="бегунок" className="search__input-tumb" /> */}
        <h3 className="search__short-movies">Короткометражки</h3>
      </div>
    </section>
  );
}

export default SearchForm;
