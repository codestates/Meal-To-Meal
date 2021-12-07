import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function Loading() {
  const LoadingContainer = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: LoadingContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../img/loading-food.json'),
    });
  }, []);
  return (
    <div className="loading-container">
      <div className="loading-backdrop">
        <div className="loading-animation" ref={LoadingContainer} />
      </div>
    </div>
  );
}

export default Loading;
