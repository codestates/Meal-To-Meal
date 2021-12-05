import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function ClickOwnStoreAlert() {
  const alertContainer = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: alertContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../img/salad-cat.json'),
    });
  }, []);
  return (
    <div className="alert-container">
      <div className="alert-backdrop">
        <div className="alert-window" onClick={e => e.stopPropagation()}>
          <div className="alert-ownstore-animation" ref={alertContainer} />
          <div className="alert-ownstore-title">🤦 여기서 이러시면 안 됩니다. 사장님!</div>
          <div className="alert-ownstore-message">
            본인의 가게에서는 식사 하실 수 없습니다. 기부는 가능하니 기부를 해 보시는 건 어떨까요?
          </div>
          <div className="alert-ownstore-button-container">
            <button className="alert-ownstore-donation-button">내 가게에 기부하기</button>
            <button className="alert-ownstore-button">닫기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClickOwnStoreAlert;
