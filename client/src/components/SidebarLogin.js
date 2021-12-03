import React, { useEffect } from 'react';
import axios from 'axios';
const { Kakao } = window;

function SidebarLogin({
  openisLoginOpenSidebarHandler,
  setIsLogin,
  accessToken,
  setAccessToken,
  issueTokens,
  navigate,
}) {
  useEffect(() => {
    issueTokens();
  }, []);
  const LogoutButtonHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/logout`, {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then(res => {
        setAccessToken('');
        setIsLogin(false);
        alert('잘 가십셔~');
        openisLoginOpenSidebarHandler();
        navigate('/map');
      })
      .catch(err => {
        alert('몬가...몬가 잘 못 되었엉!');
      });
  };

  // const logoutWithKakao = () => {
  //   const KAKAO_CLIENT_ID = '5c27007dfe0386c450a85c3aa7231b45';
  //   const KAKAO_LOGOUT_REDIRECT_URI = 'http://localhost:3000/';
  //   window.location.assign(
  //     `https://kauth.kakao.com/oauth/logout?client_id={KAKAO_CLIENT_ID}&logout_redirect_uri={KAKAO_LOGOUT_REDIRECT_URI}`
  //   );
  //   alert('록아웃!');
  // };

  return (
    <div className="sidebar-container">
      <div className="sidebar-menu-container" onClick={LogoutButtonHandler}>
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

export default SidebarLogin;
