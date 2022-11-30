import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <main className="main">
      <section className="start-page">
        <p className="start-page__title">Рады видеть!</p>
        <form className="start-page__form">
          <h3 className="input__title">E-mail</h3>
          <input
            placeholder="E-mail"
            name="emailInput"
            type="email"
            className="start-page__input"
            //   value={password}
            required
          />
          <span
            id="name-input-error"
            className="form__error form__input_type_error form__error_visible"
          />
          <h3 className="input__title">Пароль</h3>
          <input
            placeholder="Пароль"
            name="passwordInput"
            type="password"
            className="start-page__input"
            //   value={password}
            required
          />
          <span
            id="name-input-error"
            className="form__error form__input_type_error form__error_visible"
          />
          <button
            type="submit"
            className="start-page__button start-page__button_login"
          >
            Войти
          </button>
        </form>
        <div className="start-page__signin start-page__signin_login">
          <p className="start-page__question">Ещё не зарегистрированы?</p>
          <Link to="/sign-up" className="start-page__register-link">
            Регистрация
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Login;
