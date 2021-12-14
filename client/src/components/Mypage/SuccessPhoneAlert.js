import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function SuccessPhoneAlert({ navigate, openSuccessAlertHandler }) {
  const SuccessPhoneAlertAni = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: SuccessPhoneAlertAni.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../img/ok.json'),
    });
  }, []);

  return (
    <>
      <div className="success-phone-alert-backdrop">
        <div className="success-phone-alert-window">
          <div className="success-phone-alert-window-animation" ref={SuccessPhoneAlertAni} />
          <div className="success-phone-alert-text">인증에 성공했습니다!</div>
          <div className="success-phone-alert-button-container">
            <button className="success-phone-alert-button" onClick={() => openSuccessAlertHandler()}>
              닫기
            </button>
            <button className="success-phone-alert-button" onClick={() => navigate(-1)}>
              뒤로가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessPhoneAlert;
