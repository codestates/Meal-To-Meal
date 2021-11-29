import React, { useState } from 'react';

import SidebarLogin from './SidebarLogin';
import SidebarNotLogin from './SidebarNotLogin';

function Header({ isLogin, setIsLogin, openLoginModalHandler }) {
  const [isLoginOpenSidebar, setIsLoginOpenSidebar] = useState(false);
  const [isNotLoginOpenSidebar, setIsNotLoginOpenSidebar] = useState(false);

  const setIsLoginHandler = () => {
    setIsLogin(!isLogin);
  };

  const openisLoginOpenSidebarHandler = () => {
    setIsLoginOpenSidebar(!isLoginOpenSidebar);
  };
  const openisNotLoginOpenSidebarHandler = () => {
    setIsNotLoginOpenSidebar(!isNotLoginOpenSidebar);
  };

  return (
    <div className="header-container">
      <img className="header-logo" src={require('../img/meal-to-meal-logo-192.png').default} alt="" />
      <button onClick={setIsLoginHandler}>로그인 테스트!</button>
      {isLogin ? (
        <i className="fas fa-bars" onClick={openisLoginOpenSidebarHandler} />
      ) : (
        <i className="fas fa-bars" onClick={openisNotLoginOpenSidebarHandler} />
      )}
      {isLoginOpenSidebar ? <SidebarLogin /> : null}
      {isNotLoginOpenSidebar ? <SidebarNotLogin openLoginModalHandler={openLoginModalHandler} /> : null}
    </div>
  );
}

export default Header;
