import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { loginStartingValues } from "../../utils/constants";

function Login({ handleLogin }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation(loginStartingValues);

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(errors.emailInput || errors.passwordInput);
  }, [errors.emailInput, errors.passwordInput]);

  useEffect(() => {
    resetForm();
    setValues({ emailInput: "", passwordInput: "" });
    setIsDisabled(true);
  }, [resetForm, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(values["emailInput"]);
    const { email, password } = {
      email: values["emailInput"],
      password: values["passwordInput"],
    };
    handleLogin(email, password);
    resetForm();
  }

  return (
    <main className="main">
      <section className="start-page">
        <p className="start-page__title">Рады видеть!</p>
        <form onSubmit={handleSubmit} className="start-page__form">
          <h3 className="input__title">E-mail</h3>
          <input
            placeholder="E-mail"
            name="emailInput"
            onChange={handleChange}
            type="email"
            className={`start-page__input form__input_type_name ${
              errors["emailInput"] ? "form__input_type_error" : ""
            }`}
            value={values["emailInput"] || ""}
            required
          />
          <span
            id="name-input-error"
            className={`form__error ${
              errors["emailInput"] ? "form__error_visible" : ""
            }`}
          >
            {errors["emailInput"]}
          </span>
          <h3 className="input__title">Пароль</h3>
          <input
            placeholder="Пароль"
            name="passwordInput"
            onChange={handleChange}
            type="password"
            className={`start-page__input form__input_type_email ${
              errors["passwordInput"] ? "form__input_type_error" : ""
            }`}
            value={values["passwordInput"] || ""}
            required
          />
          <span
            id="name-input-error"
            className={`form__error ${
              errors["passwordInput"] ? "form__error_visible" : ""
            }`}
          >
            {errors["passwordInput"]}
          </span>
          <button
            type="submit"
            className={`start-page__button start-page__button_login ${
              !isValid ? "form__button_disabled" : ""
            }`}
            disabled={isDisabled}
          >
            Войти
          </button>
        </form>
        <div className="start-page__signin start-page__signin_login">
          <p className="start-page__question">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="start-page__register-link">
            Регистрация
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Login;
