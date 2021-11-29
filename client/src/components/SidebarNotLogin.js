import React from 'react';

function SidebarNotLogin({ openLoginModalHandler }) {
  return (
    <div className="sidebar-container">
      <div className="sidebar-menu-container" onClick={openLoginModalHandler}>
        <div className="sidebar-icon">&#x1F373;</div>
        <div className="sidebar-text">로그인</div>
      </div>
      <div className="sidebar-menu-container">
        <div className="sidebar-icon">&#x1F9C0;</div>
        <div className="sidebar-text">회원가입</div>
      </div>
      <div className="sidebar-menu-container">
        <div className="sidebar-icon">&#x1F5FA;</div>
        <div className="sidebar-text">지도보기</div>
      </div>
      <div className="sidebar-menu-container">
        <img className="sidebar-logo" src={require('../img/meal-to-meal-logo-192.png').default} alt="" />
      </div>
    </div>
  );
}

export default SidebarNotLogin;
