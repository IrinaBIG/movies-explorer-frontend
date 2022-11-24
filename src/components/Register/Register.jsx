import React from 'react';
import { Link } from "react-router-dom";

function Register () {
    return (
        <div className="start-page">
          <p className="start-page__title">Добро пожаловать!</p>
          <form className="start-page__form">
          <h3 className="input__title">Имя</h3>
            <input
              placeholder="Имя"
              name="nameInput"
              type="text"
              className="start-page__input"
            //   value={email}
              required
            />
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
            Зарегистрироваться
            </button>
          </form>
          <div className="start-page__signin">
                    <p>Уже зарегистрированы?</p>
                    <Link to="/sign-up" className="start-page__register-link">Войти</Link>
                </div>
        </div>
      );
}

export default Register;