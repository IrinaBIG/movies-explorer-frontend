import React from "react";

function FilterCheckbox() {
  return (
    <section className="checkbox">
       <label className="checkbox">
          <input type="checkbox" className="checkbox__input"/>
          <span className="checkbox__switch"></span>
        </label>
    </section>
  );
}

export default FilterCheckbox;