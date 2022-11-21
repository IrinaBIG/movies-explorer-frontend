import React from 'react';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import AboutProject from '../AboutProject/AboutProject';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardDelete, onCardLike, onCardDeletePopup }) {

    return (
        <div className="content">
           <Promo />
           <AboutProject />
           <Techs />
           <AboutMe />
           <Footer />
        </div>
    );
}

export default Main;