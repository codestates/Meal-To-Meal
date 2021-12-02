import axios from 'axios';
import React, { useState } from 'react';
import SignupModal from './SignupModal';

const { Kakao } = window;

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
    console.log('hello');
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/oauth/redirect/kakao',
    });
  };
  // const loginWithKakao = () => {
  //   const scope = 'profile_nickname,account_email';
  //   Kakao.Auth.login({
  //     scope,
  //     success: function (response) {
  //       window.Kakao.Auth.setAccessToken(response.access_token);
  //       console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);

  //       var ACCESS_TOKEN = window.Kakao.Auth.getAccessToken();

  //       window.Kakao.API.request({
  //         url: '/v2/user/me',
  //         success: function ({ kakao_account }) {
  //           console.log(kakao_account);
  //           const { email, profile } = kakao_account;

  //           console.log(email);
  //           console.log(profile.nickname);

  //           axios({
  //             method: 'post',
  //             url: `${process.env.REACT_APP_API_URL}/oauth/kakao/login`,
  //             data: {
  //               user_email: email,
  //               user_nickname: profile.nickname,
  //             },
  //           })
  //             .then(res => {
  //               console.log(res);
  //               setAccessToken(res.data.accessToken);
  //               setIsLogin(true);
  //               alert('로긴 성공! 끼얏호!!');
  //               navigate('/map');
  //               openLoginModalHandler();
  //             })
  //             .catch(error => {
  //               console.error(error);
  //               alert('카카오 로그인 에러?');
  //             });
  //         },
  //         fail: function (error) {
  //           console.log(error);
  //         },
  //       });
  //     },
  //     fail: function (error) {
  //       console.log(error);
  //     },
  //   });
  // };

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
