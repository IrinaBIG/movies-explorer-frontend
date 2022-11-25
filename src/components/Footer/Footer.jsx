import React from "react";
import { Route, Switch } from "react-router-dom";

function Footer() {
  return (
    <Switch>
      <Route exact path="/">
        <section className="footer">
          <h4 className="footer__info">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </h4>
          <div className="footer__copyright">
            <p className="footer__info footer__info_copyright footer__info_copyright-year">
              © 2022. Ирина Берестова
            </p>
            <p className="footer__info footer__info_copyright">
              Яндекс.Практикум
            </p>
            <p className="footer__info footer__info_copyright">Github</p>
          </div>
        </section>
      </Route>

      <Route path="/profile"></Route>
      <Route path="/sign-in"></Route>
      <Route path="/sign-up"></Route>

      <Route path="/movies">
        <section className="footer">
          <h4 className="footer__info">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </h4>
          <div className="footer__copyright">
            <p className="footer__info footer__info_copyright footer__info_copyright-year">
              © 2022. Ирина Берестова
            </p>
            <p className="footer__info footer__info_copyright">
              Яндекс.Практикум
            </p>
            <p className="footer__info footer__info_copyright">Github</p>
          </div>
        </section>
      </Route>

      <Route path="/saved-movies">
        <section className="footer">
          <h4 className="footer__info">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </h4>
          <div className="footer__copyright">
            <p className="footer__info footer__info_copyright footer__info_copyright-year">
              © 2022. Ирина Берестова
            </p>
            <p className="footer__info footer__info_copyright">
              Яндекс.Практикум
            </p>
            <p className="footer__info footer__info_copyright">Github</p>
          </div>
        </section>
      </Route>

      <Route path="*"></Route>
    </Switch>
  );
}

export default Footer;
