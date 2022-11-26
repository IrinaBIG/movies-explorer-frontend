import React from "react";
import { useHistory } from "react-router-dom";

function NotFound() {
  const hist = useHistory();
  return (
    <div className="not-found">
      <h3 className="not-found__error">404</h3>
      <p className="not-found__text">Страница не найдена</p>
      <div className="not-found__button">
        <button type="button" onClick={() => hist.goBack()} className="not-found__back">
          Назад
        </button>
      </div>
    </div>
  );
}

export default NotFound;
