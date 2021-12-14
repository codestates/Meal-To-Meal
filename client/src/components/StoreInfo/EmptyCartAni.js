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
      animationData: require('../../img/sad-empty-box.json'),
    });
  }, []);

  return (
    <div className="empty-cart-animation-container">
      <div className="empty-cart-animation" ref={emptyShareCartContainer} />
      <div className="empty-cart-catchphrase">나눔카트가 비어있어요!</div>
    </div>
  );
}

export default EmptyCartAni;
