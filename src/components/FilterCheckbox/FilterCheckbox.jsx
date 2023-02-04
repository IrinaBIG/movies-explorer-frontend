import React from "react";
import { useEffect } from "react";

function FilterCheckbox({ isChecked, handleFiltredCheckbox }) {

  function handleChangeCheckbox(e) {
    handleFiltredCheckbox(e.target.checked);
    console.log(e.target.checked, 'зашел в чекбокс')
  };

 


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
