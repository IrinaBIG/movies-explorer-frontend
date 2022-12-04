import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ values, handleUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);
  // console.log(currentUser.data.name);

//   function handleSubmit(e) {
//     // Запрещаем браузеру переходить по адресу формы
//     e.preventDefault();
//     // Передаём значения управляемых компонентов во внешний обработчик
//     handleUpdateUser({ name: values["firstname"], email: values["email"] });
// }


  return (
    <main className="main">
      <form
        className="form"
        id="profile-form"
        name="form-in-profile"
        // novalidate
      >
        <h1 className="profile__title">Привет, {currentUser.data.name}!</h1>
        <div className="profile__data">
          <h2 className="profile__label">Имя</h2>
          <input
            type="text"
            id="name-input"
            className="form__input form__input_type_name"
            name="firstname"
            defaultValue={currentUser.data.name}
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
            defaultValue={currentUser.data.email}
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
          // onSubmit={handleSubmit}
        >
          Редактировать
        </button>
      </form>

      <div className="profile__out">
        <Link to="/sign-in" className="profile__out-link">
          Выйти из аккаунта
        </Link>
      </div>
    </main>
  );
}

export default Profile;
