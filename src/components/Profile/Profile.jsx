import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
// import { editProfileStartingValues } from "../../utils/constants";

function Profile({ handleUpdateUser, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, setValues, isValid } =
    useFormAndValidation({
      name: currentUser.name,
      email: currentUser.email
    });
  // const history = useHistory();

  const [isDisabled, setIsDisabled] = useState(false);
  // const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    setIsDisabled(errors.firstname || errors.email);
  }, [errors.firstname, errors.email]);

  useEffect(() => {
    if (
      ((values.firstname === currentUser.name && values.email === currentUser.email)) 
    ) 
      setIsDisabled(true)
     }, [currentUser.email, currentUser.name, values.email, values.firstname]);

  // let userInfoControl = (values.firstname === currentUser.name) && (values.email === currentUser.email);
  useEffect(() => {
    if (currentUser.name && currentUser.email) {
      setValues({ firstname: currentUser.name, email: currentUser.email });
    }
  }, [currentUser, setValues]);

  console.log(values.firstname)
  console.log(values.email)
  console.log(currentUser.name)
  console.log(currentUser.email)

  // function onSignOut() {
  //   localStorage.removeItem('token');
  //   // localStorage.removeItem('search');
  //   // localStorage.removeItem('checkBoxStatus');
  //   history.push("/");
  // }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser({ name: values["firstname"], email: values["email"] });
    // setIsChange(e.target.closest('form').checkValidity());
  }

  return (
    <main className="main">
      <form
        className="form"
        id="profile-form"
        name="form-in-profile"
        onSubmit={handleSubmit}
      >
        <h1 className="profile__title">
          Привет, {currentUser.name}!
        </h1>
        <div className="profile__data">
          <h2 className="profile__label">Имя</h2>
          <input
            type="text"
            id="name-input"
            className={`form__input form__input_type_name ${
              errors["firstname"] ? "form__input_type_error" : ""
            }`}
            name="firstname"
            onChange={handleChange}
            // onChange={ isValid ? handleChange : ""}
            value={values["firstname"] || ""}
            placeholder="Имя"
            required
            minLength="2"
            maxLength="30"
            pattern="[A-Za-zА-Яа-яЁё\s-]+"
          />
        </div>
        <span
          id="name-input-error"
          className={`form__error ${
            errors["firstname"] ? "form__error_visible" : ""
          }`}
        >
          {errors["firstname"]}
        </span>

        <div className="profile__data profile__data_end">
          <h2 className="profile__label">E-mail</h2>

          <input
            type="email"
            id="email-input"
            className={`form__input form__input_type_email ${
              errors["email"] ? "form__input_type_error" : ""
            }`}
            name="email"
            // onChange={ isChange ? '' : handleChange}
            onChange={handleChange}
            value={values["email"] || ""}
            placeholder="E-mail"
            required
          />
        </div>
        <span
          id="email-input-error"
          className={`form__error ${
            errors["email"] ? "form__error_visible" : ""
          }`}
        >
          {errors["email"]}
        </span>

        <button
          type="submit"
          className={`form__button ${!isValid ? "form__button_disabled" : ""}`}
          name="add"
          aria-label="Редактировать"
          disabled={isDisabled}
          // disabled={userInfoControl || isDisabled}
        >
          Редактировать
        </button>
      </form>

      <div className="profile__out">
        <Link to="/signin" className="profile__out-link" onClick={onSignOut}>
          Выйти из аккаунта
        </Link>
      </div>
    </main>
  );
}

export default Profile;
