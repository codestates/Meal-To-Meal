import React from 'react';
import axios from 'axios';

function UnderbarLogin({ setIsLogin, navigate, openAlertHandler, openWarningAlertHandler, setAlertMessage }) {
  const LogoutButtonHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/logout`, {
        headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        withCredentials: true,
      })
      .then(res => {
        localStorage.clear();
        setIsLogin(false);
        setAlertMessage('로그아웃 되었습니다.');
        openAlertHandler();
        navigate('/');
      })
      .catch(err => {
        setAlertMessage('잘못된 요청입니다');
        openWarningAlertHandler();
        console.log(err);
      });
  };

  return (
    <div className="underbar-container">
      <div className="underbar-menu-container">
        <i className="fas fa-sign-out-alt" onClick={LogoutButtonHandler} />
      </div>
      <div className="underbar-menu-container">
        <i class="fas fa-hand-holding-usd" />
      </div>
      <div className="underbar-menu-container">
        <i className="fas fa-user" />
      </div>
      <div className="underbar-menu-container">
        <i className="fas fa-file-signature" />
      </div>
      <div className="underbar-menu-container">
        <i className="fas fa-trophy" />
      </div>
      <div className="underbar-menu-container">
        <i className="fas fa-cash-register" />
      </div>
      <div className="underbar-menu-container">
        <i className="fas fa-map-marked-alt" />
      </div>
    </div>
  );
}

export default UnderbarLogin;
