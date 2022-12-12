import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function FilterCheckbox({ isChecked, isCheckbox, handleSearchCheckbox }) {

  const handleChangeCheckbox =(evt) => {
    isCheckbox(evt.target.checked);
    handleSearchCheckbox()
  }

  // const location = useLocation();
  // const savedMovies = location.pathname === "/saved-movies";
  // const [checkBoxStatus, setCheckBoxStatus] = useState('')

  // useEffect(() => {
  //   if (!savedMovies) {
  //     setCheckBoxStatus(isChecked) 
  //   } 
  // }, [isChecked, savedMovies]);

  return (
    <section className="checkbox">
       <label className="checkbox">
          <input type="checkbox" checked={isChecked} onChange={handleChangeCheckbox} className="checkbox__input" />
          <span className="checkbox__switch"></span>
        </label>
    </section>
  );
}

export default FilterCheckbox;