import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function EmptyCartAni({ navigate }) {
  const emptyShareCartContainer = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: emptyShareCartContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../img/sad-empty-box.json'),
    });
  }, []);

  return (
    <>
      <div className="sharecart-container">
        <div className="animation-container">
          <div className="sharecart-animation" ref={emptyShareCartContainer} />
          <div className="sharecart-catchphrase">나눔카트가 비어있어요!</div>
          <button
            className="empty-sharecart-button"
            onClick={() => {
              navigate(-1);
            }}
          >
            뒤로 가기
          </button>
        </div>
      </div>
    </>
  );
}

export default EmptyCartAni;
