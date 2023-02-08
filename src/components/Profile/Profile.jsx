import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Profile({
  handleUpdateUser,
  onSignOut,
  errorTextProfile,
  isUpdate,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, setValues, isValid } =
    useFormAndValidation({
      firstname: currentUser.name,
      email: currentUser.email,
    });

  let userInfoControl =
    values.firstname === currentUser.name && values.email === currentUser.email;
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(errors.firstname || errors.email);
    if (userInfoControl) {
      setIsDisabled(true);
      return;
    }
  }, [errors.firstname, errors.email, userInfoControl]);

   function handleSubmit(e) {
     e.preventDefault();
     handleUpdateUser({ name: values["firstname"], email: values["email"] });
     setIsDisabled(true);
   }


  useEffect(() => {
    if (currentUser.name && currentUser.email) {
      setValues({ firstname: currentUser.name, email: currentUser.email });
    }    
  }, [currentUser.email, currentUser.name, setValues, isUpdate]);

  return (
    <main className="main">
      <form
        className="form"
        id="profile-form"
        name="form-in-profile"
        onSubmit={handleSubmit}
      >
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
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
          className={`form__button ${
            userInfoControl
              ? "form__button-profile_disabled"
              : isValid
              ? ""
              : "form__button-profile_disabled"
          }`}
          name="add"
          aria-label="Редактировать"
          disabled={isDisabled}
          // onClick={handleShowMessageUpdate}
        >
          Редактировать
        </button>
      </form>

      <div className="profile__out">
        <Link to="/" className="profile__out-link" onClick={onSignOut}>
          Выйти из аккаунта
        </Link>
      </div>

      {isUpdate ? 
        <p className="profile__message profile__message_success">
          Данные успешно обновлены!
        </p>
       : 
        <p className="profile__message profile__message_fail">
          {errorTextProfile}
        </p>
      }     
    </main>
  );
}

export default Profile;
