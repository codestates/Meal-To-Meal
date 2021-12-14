import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function ThankAlert({ navigate }) {
  const alertContainer = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: alertContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../img/drawing-a-love.json'),
    });
  }, []);
  return (
    <div className="alert-container">
      <div className="alert-backdrop">
        <div className="alert-window" onClick={e => e.stopPropagation()}>
          <div className="alert-animation" ref={alertContainer} />
          <div className="alert-message">
            결제가 완료되었습니다! 따뜻한 마음 감사합니다. 이 결제는 테스트용으로 실행되어 매일 24:00시에 환불됩니다.
          </div>
          <div className="alert-ownstore-button-container">
            <button className="alert-ownstore-donation-button" onClick={() => navigate('/mydonation')}>
              내 기부내역으로 가기
            </button>
            <button className="alert-ownstore-donation-button" onClick={() => navigate('/map')}>
              홈으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankAlert;
