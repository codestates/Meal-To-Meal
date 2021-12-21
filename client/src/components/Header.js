import React, { useState } from 'react';

import SidebarLogin from './Sidebar/SidebarLogin';
import SidebarNotLogin from './Sidebar/SidebarNotLogin';

function Header({
  isLogin,
  setIsLogin,
  openLoginModalHandler,
  openSignupModalHandler,
  setAccessToken,
  issueTokens,
  navigate,
  openAlertHandler,
  openWarningAlertHandler,
  setAlertMessage,
  setKakaoLogin,
}) {
  const [isLoginOpenSidebar, setIsLoginOpenSidebar] = useState(false);
  const [isNotLoginOpenSidebar, setIsNotLoginOpenSidebar] = useState(false);

  const openisLoginOpenSidebarHandler = () => {
    setIsLoginOpenSidebar(!isLoginOpenSidebar);
  };
  const openisNotLoginOpenSidebarHandler = () => {
    setIsNotLoginOpenSidebar(!isNotLoginOpenSidebar);
  };

  const accessToken = localStorage.getItem('accessToken');

  return (
    <div className="header-container">
      <img
        className="header-logo"
        src={require('../img/meal-to-meal-logo-192.png').default}
        alt=""
        onClick={() => navigate('/maps')}
      />
      <i
        className="fas fa-bars"
        onClick={() => {
          issueTokens();
          if (isLogin) {
            openisLoginOpenSidebarHandler();
          } else {
            openisNotLoginOpenSidebarHandler();
          }
        }}
      />
      {isLoginOpenSidebar ? (
        <SidebarLogin
          openisNotLoginOpenSidebarHandler={openisNotLoginOpenSidebarHandler}
          openisLoginOpenSidebarHandler={openisLoginOpenSidebarHandler}
          setIsLogin={setIsLogin}
          isLogin={isLogin}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          issueTokens={issueTokens}
          navigate={navigate}
          openAlertHandler={openAlertHandler}
          openWarningAlertHandler={openWarningAlertHandler}
          setAlertMessage={setAlertMessage}
          setKakaoLogin={setKakaoLogin}
        />
      ) : null}
      {isNotLoginOpenSidebar ? (
        <SidebarNotLogin
          openLoginModalHandler={openLoginModalHandler}
          openisNotLoginOpenSidebarHandler={openisNotLoginOpenSidebarHandler}
          openSignupModalHandler={openSignupModalHandler}
        />
      ) : null}
    </div>
  );
}

export default Header;
