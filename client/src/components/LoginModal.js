import axios from 'axios';
import React, { useState, useEffect } from 'react';
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
        alert('로긴 성공! 끼얏호!!');
        navigate('/map');
        openLoginModalHandler();
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

  const loginWithKakao = () => {
    const KAKAO_CLIENT_ID = '5c27007dfe0386c450a85c3aa7231b45';
    const KAKAO_REDIRECT_URI = 'http://localhost:3000/map';
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`
    );
  };

  return (
    <div className="login-modal-container">
      <div className="login-modal-backdrop" onClick={openLoginModalHandler}>
        <div className="login-modal-window" onClick={e => e.stopPropagation()}>
          <div className="login-info-container">
            <img className="login-logo" src={require('../img/meal-to-meal-logo-192.png').default} alt="" />
            <div className="login-input-container">
              <div className="login-text">이메일</div>
              <input
                className="login-input"
                placeholder="E-Mail"
                onKeyPress={enterKey}
                onChange={handleInputValue('user_email')}
              />
              <div className="login-text">비밀번호</div>
              <input
                className="login-input"
                type="password"
                placeholder="Password"
                onKeyPress={enterKey}
                onChange={handleInputValue('user_password')}
              />
              <div className="login-error-message">{errorMessage}</div>
              <div className="login-button-container">
                <button className="login-button" onClick={loginButtonHandler}>
                  로그인
                </button>
                <div className="login-signup-text">아직 회원이 아니신가요?</div>
                <div className="login-signup-link" onClick={openSignupModalHandler}>
                  회원가입
                </div>
              </div>
              <div className="login-kakao-container">
                <img
                  className="login-kakao-button"
                  src={require('../img/kakao_login_medium_narrow.png').default}
                  alt=""
                  onClick={loginWithKakao}
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
