import React, { useState } from 'react';

import SidebarLogin from './Sidebar/SidebarLogin';
import SidebarNotLogin from './Sidebar/SidebarNotLogin';

function Header({
  isLogin,
  setIsLogin,
  openLoginModalHandler,
  openSignupModalHandler,
  accessToken,
  setAccessToken,
  issueTokens,
  navigate,
  openAlertHandler,
  openWarningAlertHandler,
  setAlertMessage,
  loginAlertOpenHandler,
}) {
  const [isLoginOpenSidebar, setIsLoginOpenSidebar] = useState(false);
  const [isNotLoginOpenSidebar, setIsNotLoginOpenSidebar] = useState(false);

  const openisLoginOpenSidebarHandler = () => {
    setIsLoginOpenSidebar(!isLoginOpenSidebar);
  };
  const openisNotLoginOpenSidebarHandler = () => {
    setIsNotLoginOpenSidebar(!isNotLoginOpenSidebar);
  };

  if (window.location.pathname === '/') return null;

  return (
    <div className="header-container">
      <img
        className="header-logo"
        src={require('../img/meal-to-meal-logo-192.png').default}
        alt=""
        onClick={() => navigate('/maps')}
      />
      {isLogin ? (
        <i className="fas fa-bars" onClick={openisLoginOpenSidebarHandler} />
      ) : (
        <i className="fas fa-bars" onClick={openisNotLoginOpenSidebarHandler} />
      )}
      {isLoginOpenSidebar ? (
        <SidebarLogin
          openisLoginOpenSidebarHandler={openisLoginOpenSidebarHandler}
          setIsLogin={setIsLogin}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          issueTokens={issueTokens}
          navigate={navigate}
          openAlertHandler={openAlertHandler}
          openWarningAlertHandler={openWarningAlertHandler}
          setAlertMessage={setAlertMessage}
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
