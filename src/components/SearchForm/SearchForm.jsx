import React, { useEffect, useMemo, useState } from "react";
import loupe from "../../images/loupe.svg";
import separator from "../../images/inputSeparator.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";

function SearchForm({
  // onInput,
  onSubmitHandler,
  isChecked,
  isCheckbox,
  handleFindSavedMovie,
  handleSearchCheckbox,
  searchNameMovies,
  searchNameSavedMovies
}) {
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState("");

  const location = useLocation();
  const savedMoviesPatch = location.pathname === "/saved-movies";

 

  function handleChangeInput(e) {
    setValue(e.target.value);
    console.log(value)
  }
    console.log(value)
  
  function handleSubmitMovies(e) {
    e.preventDefault();
    console.log(value)
    if (value === null) {
      setErrors("Нужно ввести ключевое слово");
      console.log(value)
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
    handleFindSavedMovie(value);
  }

  useMemo(() => {
    if (!savedMoviesPatch) {
      setValue(searchNameMovies);
    } else {
      setValue(searchNameSavedMovies)
    }
  }, [savedMoviesPatch, searchNameMovies, searchNameSavedMovies]);

  return (
    <section className="search">
      <form
        className="search__movies"
        // onSubmit={handleSubmit}
        onSubmit={savedMoviesPatch ? handleSubmitSavedMovies : handleSubmitMovies}
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
          // className={`search__input ${errors["searchInput"] ? "form__input_type_error" : ''}`}
          placeholder="Фильм"
          name="searchInput"
          id="search-input"
          required
          onChange={handleChangeInput}
          // onChange={onInput}
          defaultValue={value}
        />
        {errors && <span className="search__span">{errors}</span>}
        <button
          type="submit"
          className="search__input-find"

          // onClick={onInput}
        ></button>
        <img
          src={separator}
          alt="декоративный элемент - разделитель"
          className="search__input-separator"
        />
        <FilterCheckbox
          isChecked={isChecked}
          isCheckbox={isCheckbox}
          handleSearchCheckbox={handleSearchCheckbox}
        />
        <h3 className="search__short-movies">Короткометражки</h3>
      </form>
    </section>
  );
}

export default SearchForm;



/// 2101 код на конец дня рабочий мой 

// import React, { useEffect, useState } from "react";
// import loupe from "../../images/loupe.svg";
// import separator from "../../images/inputSeparator.svg";
// import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
// import { useLocation } from "react-router-dom";

// function SearchForm({
//   // onInput,
//   onSubmitHandler,
//   isChecked,
//   isCheckbox,
//   handleFindSavedMovie,
//   handleSearchCheckbox,
//   serchNameMovies,
// }) {
//   const [value, setValue] = useState("");
//   const [errors, setErrors] = useState("");

//   const location = useLocation();
//   const savedMoviesPatch = location.pathname === "/saved-movies";

//   useEffect(() => {
//     if (!savedMoviesPatch) {
//       setValue(serchNameMovies);
//     } 
//   }, [savedMoviesPatch, serchNameMovies]);

//   function handleChangeInput(e) {
//     setValue(e.target.value);
//   }
//   //  console.log(value)
  
//   function handleSubmitMovies(e) {
//     e.preventDefault();
//     console.log(value)
//     if (value === null) {
//       setErrors("Нужно ввести ключевое слово");
//       setTimeout(setErrors, 1000);
//       return;
//     }
//     if (value.length === 0) {
//       setErrors("Нужно ввести ключевое слово");
//       setTimeout(setErrors, 1000);
//       return;
//     }
//     onSubmitHandler(value);
//   }

//   function handleSubmitSavedMovies(e) {
//     e.preventDefault();
//     handleFindSavedMovie(value);
//   }

//   return (
//     <section className="search">
//       <form
//         className="search__movies"
//         // onSubmit={handleSubmit}
//         onSubmit={savedMoviesPatch ? handleSubmitSavedMovies : handleSubmitMovies}
//         noValidate
//       >
//         <img
//           src={loupe}
//           alt="декоративный элемент - лупа"
//           className="search__input-loupe"
//         />
//         <input
//           type="text"
//           className="search__input"
//           // className={`search__input ${errors["searchInput"] ? "form__input_type_error" : ''}`}
//           placeholder="Фильм"
//           name="searchInput"
//           id="search-input"
//           required
//           onChange={handleChangeInput}
//           // onChange={onInput}
//           defaultValue={value}
//         />
//         {errors && <span className="search__span">{errors}</span>}
//         <button
//           type="submit"
//           className="search__input-find"

//           // onClick={onInput}
//         ></button>
//         <img
//           src={separator}
//           alt="декоративный элемент - разделитель"
//           className="search__input-separator"
//         />
//         <FilterCheckbox
//           isChecked={isChecked}
//           isCheckbox={isCheckbox}
//           handleSearchCheckbox={handleSearchCheckbox}
//         />
//         <h3 className="search__short-movies">Короткометражки</h3>
//       </form>
//     </section>
//   );
// }

// export default SearchForm;

