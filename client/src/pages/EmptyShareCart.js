import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import lottie from 'lottie-web';
import Header from '../components/Header';
import Footer from '../components/Footer';

function EmptyShareCart() {
  const navigate = useNavigate();
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
      <Header />
      <div className="sharecart-container">
        <div className="sharecart-title">나눔카트</div>
        <div className="animation-container">
          <div className="sharecart-animation" ref={emptyShareCartContainer} />
          <div className="sharecart-catchphrase">나눔카트가 비어있어요!</div>
          <button
            className="empty-sharecart-button"
            onClick={() => {
              navigate('/storeinfo');
            }}
          >
            뒤로 가기
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EmptyShareCart;
