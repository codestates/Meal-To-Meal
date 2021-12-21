import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function EmptyDonationAni() {
  const emptyDonationAniContainer = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: emptyDonationAniContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../img/empty-box-animation.json'),
    });
  }, []);

  return (
    <div className="empty-donation-container">
      <div className="empty-donation-animation" ref={emptyDonationAniContainer}></div>
      <div className="empty-donation-text">기부 내역이 비어 있어요</div>
    </div>
  );
}

export default EmptyDonationAni;
