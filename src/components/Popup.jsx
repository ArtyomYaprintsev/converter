import React from "react";

import "../styles/popup.scss";

const ErrorPopup = ({ content, closePopup, isOpened = false }) => {
  if (!isOpened) return <></>;

  return (
    <div className='popup-wrapper'>
      <div className='popup-container'>
        <div className='close-popup__container' onClick={closePopup}></div>

        <div className='error-popup popup-body'>
          <main className='popup-content'>
            <h2>При компиляции возникла ошибка</h2>
            <h3>Input error</h3>
            <p>{content}</p>

            <button className='close-popup-btn btn' onClick={closePopup}>
              Понятно
            </button>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
