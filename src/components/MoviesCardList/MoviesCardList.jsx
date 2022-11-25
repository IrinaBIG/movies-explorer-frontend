import React, { useState } from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {

  // строки 8-14 сделаны только для демонстрации верстки
  const [movies, setMovies] = useState([]);

  React.useEffect(() => {
    fetch("https://api.nomoreparties.co/beatfilm-movies")
      .then((res) => res.json())
      .then((res) => setMovies(res));
  }, []);

  return (
    <section className="movies-list">
      {movies.slice(0, 16).map((item) => {
        return (
          <MoviesCard
            card={item}
            key={item._id}
            name={item.nameRU}
            link={item.link}
            _id={item._id}
            likes={item.likes}
          />
        );
      })}
    </section>
  );
}

export default MoviesCardList;
