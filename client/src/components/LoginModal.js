import React from 'react';

import SignupModal from './SignupModal';

function LoginModal({ openLoginModalHandler, isOpenSignupModal, openSignupModalHandler }) {
  const loginButtonHandler = () => {
    alert('로그인 성공!......이었으면 좋겠지만, 아직 서버와 연결 되지 않았습니다!');
  };

  const enterKey = e => {
    if (e.key === 'Enter') return loginButtonHandler();
  };

  return (
    <div className="login-modal-container">
      <div className="login-modal-backdrop" onClick={openLoginModalHandler}>
        <div className="login-modal-window" onClick={e => e.stopPropagation()}>
          <div className="login-info-container">
            <img className="login-logo" src={require('../img/meal-to-meal-logo-192.png').default} alt="" />
            <div className="login-title-text">Login</div>
            <div className="login-input-container">
              <div className="login-text">E-Mail</div>
              <input className="login-input" placeholder="E-Mail" onKeyPress={enterKey}></input>
              <div className="login-text">Password</div>
              <input className="login-input" placeholder="password" onKeyPress={enterKey}></input>
              <div className="login-button-container">
                <button onClick={loginButtonHandler}>Login</button>
                <div className="login-signup-text">New user?</div>
                <div className="login-signup-link" onClick={openSignupModalHandler}>
                  Sign up
                </div>
              </div>
              <div className="login-kakao-container">
                <div className="login-kakao-text">Or Login with</div>
                <img
                  className="login-kakao-button"
                  src={require('../img/kakao_login_medium_narrow.png').default}
                  alt=""
                />
              </div>
            </div>
          </div>
          <img className="login-modal-img" src={require('../img/Coffee shop-bro.png').default} alt="" />
        </div>
        {isOpenSignupModal ? (
          <SignupModal onClick={e => e.stopPropagation()} openSignupModalHandler={openSignupModalHandler} />
        ) : null}
      </div>
    </div>
  );
}

export default LoginModal;
