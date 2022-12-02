import React from "react";

function Techs() {
  return (
    <section className="techs">
      <h2 className="chapter">Технологии</h2>
      <h3 className="techs__brief">7 технологий</h3>
      <p className="techs__subtitle">
        На курсе веб-разработки мы освоили технологии, которые применили <br />{" "}
        в дипломном проекте.
      </p>
      <div className="techs__stacks">
        <div className="techs__stack">HTML</div>
        <div className="techs__stack">CSS</div>
        <div className="techs__stack">JS</div>
        <div className="techs__stack">React</div>
        <div className="techs__stack">Git</div>
        <div className="techs__stack">Express.js</div>
        <div className="techs__stack">mongoDB</div>
      </div>
    </section>
  );
}

export default Techs;
