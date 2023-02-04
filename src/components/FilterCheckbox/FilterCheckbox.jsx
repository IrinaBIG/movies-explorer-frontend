import React from "react";

function FilterCheckbox({ isChecked, handleFiltredCheckbox }) {
  function handleChangeCheckbox() {
    const isCheck = localStorage.getItem(
      "checkBoxStatusSavedMovies" || "checkBoxStatus"
    );
    handleFiltredCheckbox(isCheck);
  }

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
