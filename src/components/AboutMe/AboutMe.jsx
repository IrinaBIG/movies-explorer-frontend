import React from "react";
import linkContent from "../../images/linkContent.svg";
import photoStudents from "../../images/iradiploma.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="chapter chapter__student">Студент</h2>
      <div className="about-me__info">
        <img
          className="about-me__photo"
          src={photoStudents}
          alt="Фотография студента"
        />
        <h3 className="about-me__name">Ирина</h3>
        <p className="about-me__profession">Веб-разработчик, 36 лет</p>
        <p className="about-me__description">
          Живу в Новосибирске. Образование высшее - экономист. Работаю по
          специальности. <br /> Учусь в ЯндексПрактикум. Хочу стать
          профессиональным веб-разработчиком.
        </p>
        <a
          className="about-me__content"
          href="https://github.com/IrinaBIG"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
      <p className="about-me__portfolio">Портфолио</p>
      <ul className="about-me__links">
        <li>
          <a
            className="about-me__link"
            href="https://github.com/IrinaBIG/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            <h3 className="about-me__static">Статичный сайт</h3>
            <img
              className="about-me__arrow"
              src={linkContent}
              alt="Ссылка на статичный сайт"
            />
          </a>
        </li>
        <li>
          <a
            className="about-me__link"
            href="https://github.com/IrinaBIG/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            <h3 className="about-me__static">Адаптивный сайт</h3>

            <img
              className="about-me__arrow"
              src={linkContent}
              alt="Ссылка на адаптивный сайт"
              target="_blank"
            />
          </a>
        </li>

        <li>
          <a
            className="about-me__link about-me__link_last"
            href="https://github.com/IrinaBIG/react-mesto-api-full"
            target="_blank"
            rel="noreferrer"
          >
            <h3 className="about-me__static">Одностраничное приложение</h3>

            <img
              className="about-me__arrow"
              src={linkContent}
              alt="Ссылка на одностраничное приложение"
              target="_blank"
            />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default AboutMe;
