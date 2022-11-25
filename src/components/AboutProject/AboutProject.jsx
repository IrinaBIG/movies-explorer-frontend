import React from "react";

function AboutProject() {
  return (
    <section className="about-project">
      <h1 id="about_project" className="chapter">
        О проекте
      </h1>
      <div className="two-columns">
        <div className="column">
          <h2 className="column__title">Дипломный проект включал 5 этапов</h2>
          <p className="column__subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="column">
          <h2 className="column__title">На выполнение диплома ушло 5 недель</h2>
          <p className="column__subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="contain">
        <div className="contain__column">
          <h3 className="contain__term">1 неделя</h3>
          <h3 className="contain__title">Back-end</h3>
        </div>
        <div className="contain__column contain__column_front-end">
          <h3 className="contain__term contain__term_month">4 недели</h3>
          <h3 className="contain__title">Front-end</h3>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
