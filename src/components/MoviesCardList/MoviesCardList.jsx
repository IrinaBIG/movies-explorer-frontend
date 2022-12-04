import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({movies}) {

  return (
    
    <section className="movies-list">
      {movies.slice(0, 16).map((item) => {
        return (
          <MoviesCard
            card={item}
            key={item.id}
            name={item.nameRU}
            link={`https://api.nomoreparties.co/${item.image.url}`}
            id={item.id}
            likes={item.likes}
            duration={item.duration}
            trailerLink={item.trailerLink}
          />
        );
      })}
    </section>
  );
}

export default MoviesCardList;
