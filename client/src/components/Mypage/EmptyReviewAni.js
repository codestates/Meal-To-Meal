import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function EmptyReviewAni({ navigate }) {
  const emptyOrderAnimation = useRef();

  useEffect(() => {
    lottie.loadAnimation({
      container: emptyOrderAnimation.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../img/empty-review.json'),
    });
  }, []);

  return (
    <>
      <div className="empty-review-content-container">
        <div className="empty-review-animation" ref={emptyOrderAnimation}></div>
        <div className="empty-review-text">리뷰 내역이 비어 있어요</div>
        <button className="empty-back-button" onClick={() => navigate('/maps')}>
          먹으러 가기
        </button>
      </div>
    </>
  );
}

export default EmptyReviewAni;
