import React from "react";

function FilterCheckbox({ isChecked, handleFiltredCheckbox }) {

  return (
    <section className="checkbox">
      <label className="checkbox">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleFiltredCheckbox}
          className="checkbox__input"
        />
        <span className="checkbox__switch"></span>
      </label>
    </section>
  );
}

export default FilterCheckbox;
