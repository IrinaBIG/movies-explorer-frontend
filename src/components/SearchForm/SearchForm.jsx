import React, { useEffect, useState } from "react";
import loupe from "../../images/loupe.svg";
import separator from "../../images/inputSeparator.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function SearchForm({ onInput, onSubmitHandler, isChecked, isCheckbox }) {

  const { values, handleChange, errors, setValues, isValid, handleSearchCheckbox } =
    useFormAndValidation();

  // const [isDisabled, setIsDisabled] = useState(false);

  // useEffect(() => {
  //   setIsDisabled(errors.searchInput);
  // }, [errors.searchInput]);

  useEffect(() => {
    setValues({ searchInput: "" });

  }, [setValues]);

  return (
    <section className="search">
      <form className="search__movies" onSubmit={isValid ? onSubmitHandler : "ghh"} noValidate>
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
          onChange={handleChange}
          onInput={onInput}
          value={values["searchInput"] || ""}
        />

        <button
          type="submit"
          // className="search__input-find"
          className={`search__input-find ${
            !isValid ? "form__error_visible" : ""
          }`}
          // onClick={onInput}
          // disabled={isDisabled}
        ></button>
        <img
          src={separator}
          alt="декоративный элемент - разделитель"
          className="search__input-separator"
        />
        <FilterCheckbox isChecked={isChecked} isCheckbox={isCheckbox} handleSearchCheckbox={handleSearchCheckbox} />
        <h3 className="search__short-movies">Короткометражки</h3>
      </form>
      {/* <span
          id="search-input-error"
          className={`form__error ${
            errors["searchInput"] ? "form__error_visible" : ""
          }`}
        >
          {errors["searchInput"]}
        </span> */}

      <span
        id="search-input-error"
        className={`form__error ${errors["е"] ? "form__error_visible" : ""}`}
      >
      
      </span>
    </section>
  );
}

export default SearchForm;








// import React from "react";
// import loupe from "../../images/loupe.svg";
// import separator from "../../images/inputSeparator.svg";
// import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
// import { useFormAndValidation } from "../../hooks/useFormAndValidation";

// function SearchForm({ onInput, onSubmitHandler, isChecked, isCheckbox }) {

//   // function handleInput(evt) {
//   //   onInput(evt.target.value);
//   // }
//   // const avatarRef = useRef();
//   const { values, handleChange, errors, setValues, isValid } =
//     useFormAndValidation();

//   return (
//     <section className="search">
//       <form className="search__movies" onSubmit={onSubmitHandler}>
//         <img
//           src={loupe}
//           alt="декоративный элемент - лупа"
//           className="search__input-loupe"
//         />
//         <input
//           type="text"
//           // className="search__input"
//           className={`search__input ${errors["search"] ? "form__input_type_error" : ''}`}
//           placeholder="Фильм"
//           name="search"
//           id="search-input"
//           required
//           onChange={handleChange}
//           onInput={onInput}
//           value={values["search"] || ''}
//         />
        
//         <button 
//         type="submit" 
//         // className="search__input-find"
//         className={`search__input-find ${!isValid ? "form__error_visible" : ""}`}
//         // onClick={onInput}
//         >
//         </button>
//         <img
//           src={separator}
//           alt="декоративный элемент - разделитель"
//           className="search__input-separator"
//         />      
//         <FilterCheckbox 
//         isChecked={isChecked}
//         isCheckbox={isCheckbox}
//         />
//         <h3 className="search__short-movies">Короткометражки</h3>
//       </form>
//       <span
//           id="search-input-error"
//           className={`form__error ${
//             errors["search"] ? "form__error_visible" : ""
//           }`}
//         >
//           {errors["search"]}
//         </span>
//     </section>
//   );
// }

// export default SearchForm;
