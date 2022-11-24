import React from "react";
import { Link } from "react-router-dom";

function NotFound () {
  return (
    <div className="not-found">
      <h3 className="not-found__error">404</h3>
      <p className="not-found__text">Страница не найдена</p>
      <Link to="" className="not-found__back">Назад</Link>
    </div>
  );
}

export default NotFound;
