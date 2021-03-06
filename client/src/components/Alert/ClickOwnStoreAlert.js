import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function ClickOwnStoreAlert({ navigate, openClickOwnStoreAlertHandler }) {
  const alertContainer = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: alertContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../img/salad-cat.json'),
    });
  }, []);
  return (
    <div className="alert-container">
      <div className="alert-backdrop" onClick={openClickOwnStoreAlertHandler}>
        <div className="alert-window" onClick={e => e.stopPropagation()}>
          <div className="alert-ownstore-animation" ref={alertContainer} />
          <div className="alert-ownstore-title">π€¦ μ¬κΈ°μ μ΄λ¬μλ©΄ μ λ©λλ€. μ¬μ₯λ!</div>
          <div className="alert-ownstore-message">
            λ³ΈμΈμ κ°κ²μμλ μμ¬ νμ€ μ μμ΅λλ€. κΈ°λΆλ κ°λ₯νλ κΈ°λΆλ₯Ό ν΄ λ³΄μλ κ±΄ μ΄λ¨κΉμ?
          </div>
          <div className="alert-ownstore-button-container">
            <button className="alert-ownstore-button" onClick={openClickOwnStoreAlertHandler}>
              λ«κΈ°
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClickOwnStoreAlert;
