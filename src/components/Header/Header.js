import React from 'react';
import headerLogo from '../../images/logo.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header() {

    return (
        <div className="header">
            <img className="logo" src={headerLogo} alt="логотип Mesto" />
            <Switch>

                <Route path="/">
                    <Link to="/sign-up" className="header__link">
                        Регистрация
                    </Link>
                    <button className="header__link-exit" type="button">
                        Войти
                    </button>
                </Route>

            </Switch>

        </div >
    );
}

export default Header;