import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="start-page">
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
        <h3 className="input__title">Пароль</h3>
        <input
          placeholder="Пароль"
          name="passwordInput"
          type="password"
          className="start-page__input"
        //   value={password}
          required
        />
        <button type="submit" className="start-page__button">
          Войти
        </button>
      </form>
      <div className="start-page__signin">
                <p>Ещё не зарегистрированы?</p>
                <Link to="/sign-up" className="start-page__register-link">Регистрация</Link>
            </div>
    </div>
  );
}

export default Login;
