import React, { useState } from 'react';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {

    const [movies, setMovies] = useState([]);

    React.useEffect(() => {
        fetch('https://api.nomoreparties.co/beatfilm-movies')
        .then(res => res.json())
        .then(res => setMovies(res))
    }, []);

  return (
    <section className='movies-list'>
      {movies.slice(0,16).map((item) => {
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