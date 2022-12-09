import React from "react";

function FilterCheckbox({ isChecked, isCheckbox, handleSearchCheckbox }) {

  const handleChangeCheckbox =(evt) => {
    isCheckbox(evt.target.checked);
    
  }

  return (
    <section className="checkbox">
       <label className="checkbox" onClick={handleSearchCheckbox}>
          <input type="checkbox" checked={isChecked} onChange={handleChangeCheckbox} className="checkbox__input" />
          <span className="checkbox__switch"></span>
        </label>
    </section>
  );
}

export default FilterCheckbox;