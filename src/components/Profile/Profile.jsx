import React from "react";
import { Link, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ values, handleUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const history = useHistory();

    function handleSubmit(e) {
      e.preventDefault();
      handleUpdateUser({ name: values["firstname"], email: values["email"] });
  }

  function onSignOut() {
    // localStorage.removeItem("token");
    localStorage.clear();
    history.push("/");
    // currentUser('');
  }

  return (
    <main className="main">
      <form
        className="form"
        id="profile-form"
        name="form-in-profile"
        // novalidate
      >
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <div className="profile__data">
          <h2 className="profile__label">Имя</h2>
          <input
            type="text"
            id="name-input"
            className="form__input form__input_type_name"
            name="firstname"
            defaultValue={currentUser.name}
            placeholder="Имя"
            required
            minLength="2"
            maxLength="30"
          />
        </div>
        <span
          id="name-input-error"
          className="form__error form__input_type_error form__error_visible"
        />

        <div className="profile__data profile__data_end">
          <h2 className="profile__label">E-mail</h2>
          <input
            type="email"
            id="email-input"
            className="form__input form__input_type_email"
            name="email"
            defaultValue={currentUser.email}
            placeholder="E-mail"
            required
          />
        </div>
        <span
          id="email-input-error"
          className="form__error form__input_type_error form__error_visible"
        ></span>

        <button
          type="submit"
          className="form__button"
          name="add"
          aria-label="Редактировать"
          onSubmit={handleSubmit}
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
