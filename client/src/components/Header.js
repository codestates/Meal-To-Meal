import React, { useState } from 'react';

import SidebarLogin from './SidebarLogin';
import SidebarNotLogin from './SidebarNotLogin';

function Header({ isLogin, setIsLogin, openLoginModalHandler, openSignupModalHandler, setAccessToken, navigate }) {
  const [isLoginOpenSidebar, setIsLoginOpenSidebar] = useState(false);
  const [isNotLoginOpenSidebar, setIsNotLoginOpenSidebar] = useState(false);

  const openisLoginOpenSidebarHandler = () => {
    setIsLoginOpenSidebar(!isLoginOpenSidebar);
  };
  const openisNotLoginOpenSidebarHandler = () => {
    setIsNotLoginOpenSidebar(!isNotLoginOpenSidebar);
  };

  return (
    <div className="header-container">
      <img className="header-logo" src={require('../img/meal-to-meal-logo-192.png').default} alt="" />
      {isLogin ? (
        <i className="fas fa-bars" onClick={openisLoginOpenSidebarHandler} />
      ) : (
        <i className="fas fa-bars" onClick={openisNotLoginOpenSidebarHandler} />
      )}
      {isLoginOpenSidebar ? (
        <SidebarLogin
          openisLoginOpenSidebarHandler={openisLoginOpenSidebarHandler}
          setIsLogin={setIsLogin}
          setAccessToken={setAccessToken}
          navigate={navigate}
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
