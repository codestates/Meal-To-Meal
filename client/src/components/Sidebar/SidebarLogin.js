import React from 'react';
import axios from 'axios';

function SidebarLogin({
  openisLoginOpenSidebarHandler,
  setIsLogin,
  navigate,
  openAlertHandler,
  openWarningAlertHandler,
  setAlertMessage,
  setKakaoLogin,
}) {
  const LogoutButtonHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/logout`, {
        headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        withCredentials: true,
      })
      .then(res => {
        localStorage.clear();
        setIsLogin(false);
        setKakaoLogin(false);
        openisLoginOpenSidebarHandler();
        navigate('/');
        setAlertMessage('로그아웃 되었습니다.');
        openAlertHandler();
      })
      .catch(err => {
        setAlertMessage('잘못된 요청입니다');
        openWarningAlertHandler();
        console.log(err);
      });
  };

  return (
    <div className="sidebar-backdrop" onClick={() => openisLoginOpenSidebarHandler()}>
      <div className="sidebar-container">
        <div className="sidebar-menu-container" onClick={LogoutButtonHandler}>
          <div className="sidebar-icon">&#x1F35A;</div>
          <div className="sidebar-text">로그아웃</div>
        </div>
        <div
          className="sidebar-menu-container"
          onClick={() => {
            navigate('/mydonation');
          }}
        >
          <div className="sidebar-icon">&#x1F35D;</div>
          <div className="sidebar-text">내 기부내역</div>
        </div>
        <div
          className="sidebar-menu-container"
          onClick={() => {
            openisLoginOpenSidebarHandler();
            navigate('/mypage');
          }}
        >
          <div className="sidebar-icon">&#x1F96A;</div>
          <div className="sidebar-text">내 회원정보</div>
        </div>
        <div
          className="sidebar-menu-container"
          onClick={() => {
            navigate('/usermeal');
          }}
        >
          <div className="sidebar-icon">&#x1F357;</div>
          <div className="sidebar-text">예약내역</div>
        </div>
        <div className="sidebar-menu-container">
          <div className="sidebar-icon">&#x1F370;</div>
          <div className="sidebar-text" onClick={() => navigate('/management')}>
            사장님 페이지
          </div>
        </div>
        <div
          className="sidebar-menu-container"
          onClick={() => {
            openisLoginOpenSidebarHandler();
            navigate('/maps');
          }}
        >
          <div className="sidebar-icon">&#x1F5FA;</div>
          <div className="sidebar-text">지도보기</div>
        </div>
        <div className="sidebar-menu-container">
          <img className="sidebar-logo" src={require('../../img/meal-to-meal-logo-192.png').default} alt="" />
        </div>
      </div>
    </div>
  );
}

export default SidebarLogin;
