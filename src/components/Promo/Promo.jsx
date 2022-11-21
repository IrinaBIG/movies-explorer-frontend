import React from "react";
import promoImage from "../../images/promoLogo.svg";

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета <br />
        Веб-разработки.
      </h1>
      <p className="promo__subtitle">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <div className="promo__button-link">
        <a href="#about_project" className="promo__link" aria-label="Узнать больше">
          Узнать больше
        </a>
      </div>
      <img
        className="promo__image"
        src={promoImage}
        alt="Здесь расположена картинка, 
                напоминающая землю с материками"
      />
    </section>
  );
}

export default Promo;
