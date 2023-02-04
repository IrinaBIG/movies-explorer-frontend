import React from "react";

function FilterCheckbox({ isChecked, handleFiltredCheckbox }) {

  console.log(isChecked, '111111111')

  function handleChangeCheckbox() {
    const isCheck = localStorage.getItem("checkBoxStatusSavedMovies" || "checkBoxStatus");
    handleFiltredCheckbox(isCheck);
    console.log(isChecked, 'зашел в чекбокс')
    console.log(isChecked, 'yyyyyyyyy')
  };

  console.log(isChecked, '2222222222')


  return (
    <section className="checkbox">
      <label className="checkbox">
        <input
          type="checkbox"
          // checked={isChecked}
          onChange={handleChangeCheckbox}
          defaultChecked={isChecked}
          className="checkbox__input"
        />
        <span className="checkbox__switch"></span>
      </label>
    </section>
  );
}

export default FilterCheckbox;
