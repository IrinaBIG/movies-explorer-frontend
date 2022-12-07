import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { registerStartingValues } from "../../utils/constants";

function Register({ handleRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { values, handleChange, errors, isValid, setValues, resetForm }
  // = useFormAndValidation(registerStartingValues);

  // const [isDisabled, setIsDisabled] = useState(false);


  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(name, password, email);
  }

  return (
    <main className="main">
      <section className="start-page">
        <p className="start-page__title">Добро пожаловать!</p>
        <form onSubmit={handleSubmit} className="start-page__form">
          <h3 className="input__title">Имя</h3>
          <input
            placeholder="Имя"
            name="nameInput"
            onChange={handleChangeName}
            type="text"
            className="start-page__input"
            value={name}
            required
          />
          <span
            id="name-input-error"
            className="form__error form__input_type_error form__error_visible"
          />
          <h3 className="input__title">E-mail</h3>
          <input
            placeholder="E-mail"
            name="emailInput"
            onChange={handleChangeEmail}
            type="email"
            className="start-page__input"
            value={email}
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
            onChange={handleChangePassword}
            type="password"
            className="start-page__input"
            value={password}
            required
          />
          <span
            id="name-input-error"
            className="form__error form__input_type_error form__error_visible"
          />
          <button type="submit" className="start-page__button">
            Зарегистрироваться
          </button>
        </form>
        <div className="start-page__signin">
          <p className="start-page__question">Уже зарегистрированы?</p>
          <Link to="/signin" className="start-page__register-link">
            Войти
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Register;
