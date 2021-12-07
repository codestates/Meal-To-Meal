import React from 'react';

function LoginAlert({ loginAlertOpenHandler, openLoginModalHandler, openSignupModalHandler }) {
  return (
    <div className="login-alert-container">
      <div className="login-alert-backdrop" onClick={loginAlertOpenHandler}>
        <div className="login-alert-window" onClick={e => e.stopPropagation()}>
          <img className="login-alert-logo" src={require('../../img/meal-to-meal-logo-192.png').default} alt="" />
          <div className="login-alert-text">먼저, 로그인을 하시고 한끼의 기쁨을 모두와 나눠 보세요!</div>
          <div className="login-alert-button-container">
            <button className="login-alert-button" onClick={openLoginModalHandler}>
              🍮 Meal To Meal과 함께하기!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAlert;
