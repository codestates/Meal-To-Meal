import React from 'react';

function Sidebar_Login() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-menu-container">
        <div className="sidebar-icon">&#x1F35A;</div>
        <div className="sidebar-text">로그아웃</div>
      </div>
      <div className="sidebar-menu-container">
        <div className="sidebar-icon">&#x1F35D;</div>
        <div className="sidebar-text">내 기부내역</div>
      </div>
      <div className="sidebar-menu-container">
        <div className="sidebar-icon">&#x1F96A;</div>
        <div className="sidebar-text">내 회원정보</div>
      </div>
      <div className="sidebar-menu-container">
        <div className="sidebar-icon">&#x1F357;</div>
        <div className="sidebar-text">예약내역</div>
      </div>
      <div className="sidebar-menu-container">
        <div className="sidebar-icon">&#x1F355;</div>
        <div className="sidebar-text">랭킹보기</div>
      </div>
      <div className="sidebar-menu-container">
        <div className="sidebar-icon">&#x1F370;</div>
        <div className="sidebar-text">사장님 페이지</div>
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

export default Sidebar_Login;