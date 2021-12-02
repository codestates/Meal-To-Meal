import React from 'react';

function SidebarNotLogin({ openLoginModalHandler, openisNotLoginOpenSidebarHandler, openSignupModalHandler }) {
  const clickLogin = () => {
    openLoginModalHandler();
    openisNotLoginOpenSidebarHandler();
  };
  const clickSignup = () => {
    openLoginModalHandler();
    openSignupModalHandler();
    openisNotLoginOpenSidebarHandler();
  };
  return (
    <div className="sidebar-container">
      <div className="sidebar-menu-container" onClick={clickLogin}>
        <div className="sidebar-icon">&#x1F373;</div>
        <div className="sidebar-text">로그인</div>
      </div>
      <div className="sidebar-menu-container" onClick={clickSignup}>
        <div className="sidebar-icon">&#x1F9C0;</div>
        <div className="sidebar-text">회원가입</div>
      </div>
      <div className="sidebar-menu-container">
        <img className="sidebar-logo" src={require('../img/meal-to-meal-logo-192.png').default} alt="" />
      </div>
    </div>
  );
}

export default SidebarNotLogin;
