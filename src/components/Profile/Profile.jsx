import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { editProfileStartingValues } from "../../utils/constants";

function Profile({ handleUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  // console.log(currentUser);
  const { values, handleChange, errors, setValues } = useFormAndValidation(
    editProfileStartingValues
  );
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (currentUser.name && currentUser.email) {
      setValues({ firstname: currentUser.name, email: currentUser.email });
    }
  }, [currentUser, setValues]);
    
  useEffect(() => {
    setIsDisabled(errors.firstname || errors.email);
  }, [errors.firstname, errors.email]);
  
  function onSignOut() {
    // localStorage.removeItem("token");
    localStorage.clear();
    history.push("/");
    // currentUser('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser({ name: values["firstname"], email: values["email"] });
    console.log(values);
  }

  return (
    <main className="main">
      <form
        className="form"
        id="profile-form"
        name="form-in-profile"
        onSubmit={handleSubmit}
      >
        <h1 className="profile__title">Привет, {currentUser.name || currentUser.data.name}!</h1>
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
            value={values["firstname"] || [currentUser.name]}
            placeholder="Имя"
            required
            minLength="2"
            maxLength="30"
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
            onChange={handleChange}
            value={values["email"] || [currentUser.email]}
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
          className={`form__button ${
            isDisabled ? "form__button_disabled" : ""
          }`}
          name="add"
          aria-label="Редактировать"
          disabled={isDisabled}
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
