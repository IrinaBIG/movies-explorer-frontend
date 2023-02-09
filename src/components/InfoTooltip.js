import React from 'react';

function InfoToolTip({ isOpen, onClose, ifRegOk }) {

    function handleCloseOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            onClose();
        }
    }
    // console.log(ifRegOk);
    return (

        <div className={`popup popup__place_tooltip ${isOpen && "popup_is-active"}`} onMouseDown={handleCloseOverlay}>

            {ifRegOk
                ? <div className="popup__content">
                    <button className="popup__close" type="button" onClick={onClose}></button>
                    <h4 className="popup__title popup__title_place-tooltip">Вы успешно зарегистрировались!</h4>
                </div>
                : <div className="popup__content popup__content_place-infoTool">
                    <button className="popup__close" type="button" onClick={onClose}></button>
                    <h4 className="popup__title popup__title_place-tooltip">Что-то пошло не так! Попробуйте ещё раз.</h4>
                </div>
            }
        </div>
    )
}

export default InfoToolTip;