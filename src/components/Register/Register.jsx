import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { REGISTER_STARTING_VALUES } from "../../utils/constants";

function Register({ handleRegister }) {
  const { values, handleChange, errors, setValues, resetForm, isValid } =
    useFormAndValidation(REGISTER_STARTING_VALUES);

  const [isDisabled, setIsDisabled] = useState(false);
 
  
  useEffect(() => {
    setIsDisabled(
      errors.nameInput && errors.emailInput && errors.passwordInput
    );
  }, [errors.nameInput, errors.emailInput, errors.passwordInput]);

  useEffect(() => {
    resetForm();
    setValues({ nameInput: "", emailInput: "", passwordInput: "" });
    setIsDisabled(true);
  }, [resetForm, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = {
      name: values["nameInput"],
      email: values["emailInput"],
      password: values["passwordInput"],
    };
    handleRegister(name, email, password);
    resetForm();
    setIsDisabled(true);
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
            onChange={handleChange}
            type="text"
            className={`start-page__input form__input_type_name ${
              errors["nameInput"] ? "form__input_type_error" : ""
            }`}
            value={values["nameInput"] || ""}
            required
            minLength="2"
            maxLength="30"
            pattern="[A-Za-zА-Яа-яЁё\s-]+"
          />
          <span
            id="name-input-error"
            className={`form__error ${
              errors["nameInput"] ? "form__error_visible" : ""
            }`}
          >
            {errors["nameInput"]}
          </span>
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
            pattern=".+@.+\..+"
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
            className={`start-page__button ${
              !isValid ? "form__button_disabled" : ""
            }`}
            disabled={isDisabled}
          >
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
