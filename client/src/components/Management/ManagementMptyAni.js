import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function ManagementMptyAni({ navigate }) {
  const emptyManagementContainer = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: emptyManagementContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../img/emptyStore.json'),
    });
  }, []);
  return (
    <>
      <div className="animation-container">
        <div className="management-empty-animation" ref={emptyManagementContainer} />
        <div className="management-empty-catchphrase">아직 등록된 가게가 없어요! 혹시, 사장님이신가요?</div>
        <div className="management-empty-button-container">
          <button className="management-empty-button" onClick={() => navigate('/addstore')}>
            {' '}
            👨‍🍳 가게 등록하기
          </button>
          <button className="management-empty-button" onClick={() => navigate(-1)}>
            뒤로 가기
          </button>
        </div>
      </div>
    </>
  );
}

export default ManagementMptyAni;
