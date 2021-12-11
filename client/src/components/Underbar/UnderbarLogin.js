import React from 'react';
import axios from 'axios';

function UnderbarLogin({
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
        setKakaoLogin(false);
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
        {/* 로그아웃 */}
        <i className="fas fa-sign-out-alt" onClick={LogoutButtonHandler} />
      </div>
      <div
        className="underbar-menu-container"
        onClick={() => {
          navigate('/mydonation');
        }}
      >
        {/* 기부내역 */}
        <i class="fas fa-hand-holding-usd" />
      </div>
      <div className="underbar-menu-container">
        {/* 마이 페이지 */}
        <i className="fas fa-user" onClick={() => navigate('/mypage')} />
      </div>
      <div className="underbar-menu-container">
        {/* 예약내역 */}
        <i className="fas fa-file-signature" onClick={() => navigate('/usermeal')} />
      </div>
      <div className="underbar-menu-container">
        {/* 랭킹 */}
        <i className="fas fa-trophy" />
      </div>
      <div className="underbar-menu-container">
        {/* 사장님 페이지 */}
        <i className="fas fa-cash-register" onClick={() => navigate('/management')} />
      </div>
      <div className="underbar-menu-container">
        {/* 지도보기 */}
        <i className="fas fa-map-marked-alt" onClick={() => navigate('/maps')} />
      </div>
    </div>
  );
}

export default UnderbarLogin;
