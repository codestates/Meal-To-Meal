import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function EmptyOrderHistory({ navigate }) {
  const emptyOrderAnimation = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: emptyOrderAnimation.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../img/no-order-history.json'),
    });
  }, []);
  return (
    <>
      <div className="empty-order-container">
        <div className="empty-order-title">예약 내역</div>
        <div className="empty-order-content-container">
          <div className="empty-order-animation" ref={emptyOrderAnimation}></div>
          <div className="empty-order-text">예약 내역이 비어 있어요</div>
          <button className="empty-back-button" onClick={() => navigate(-1)}>
            뒤로 가기
          </button>
        </div>
      </div>
    </>
  );
}

export default EmptyOrderHistory;
