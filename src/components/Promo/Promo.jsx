import React from "react";
import promoImage from "../../images/promoLogo.svg";

function Promo() {
  return (
    <section className="promo">
      <img
        className="promo__image"
        src={promoImage}
        alt="Здесь расположена картинка, 
                напоминающая землю с материками"
      />
      <h1 className="promo__title">
        Учебный проект студента факультета <br />
        Веб-разработки.
      </h1>
      <p className="promo__subtitle">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
        <button type="button" className="promo__button-link">
        <a
          href="#about_project"
          className="promo__link"
          aria-label="Узнать больше"
        >
          Узнать больше
        </a>
      </button>
      
    </section>
  );
}

export default Promo;
