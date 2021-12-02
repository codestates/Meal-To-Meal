import axios from 'axios';
import React, { useState } from 'react';
import SignupModal from './SignupModal';

function LoginModal({
  openLoginModalHandler,
  isOpenSignupModal,
  openSignupModalHandler,
  setAccessToken,
  setIsLogin,
  navigate,
}) {
  const [loginInfo, setLoginInfo] = useState({
    user_email: '',
    user_password: '',
  });

  const loginButtonHandler = () => {
    const { user_email, user_password } = loginInfo;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        { user_email: user_email, user_password: user_password },
        { withCredentials: true, ContentType: 'application/json' }
      )
      .then(res => {
        setAccessToken(res.data.accessToken);
        setIsLogin(true);
        navigate('map');
      })
      .catch(err => {
        setErrorMessage('아이디와 비밀번호를 확인해주세요.');
      });
  };

  const enterKey = e => {
    if (e.key === 'Enter') return loginButtonHandler();
  };

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputValue = key => e => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value.toLowerCase() });
    setErrorMessage('');
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
              <input
                className="login-input"
                placeholder="E-Mail"
                onKeyPress={enterKey}
                onChange={handleInputValue('user_email')}
              />
              <div className="login-text">Password</div>
              <input
                className="login-input"
                placeholder="Password"
                onKeyPress={enterKey}
                onChange={handleInputValue('user_password')}
              />
              <div className="login-button-container">
                <div className="login-error-message">{errorMessage}</div>
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
