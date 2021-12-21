import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function NotFound() {
  const notfoundcontainer = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: notfoundcontainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../img/not-found.json'),
    });
  }, []);

  return (
    <>
      <div className="animation-container">
        <div className="notfound-animation" ref={notfoundcontainer} />
        <div className="notfound-catchphrase">페이지를 찾을 수 없습니다.</div>
      </div>
    </>
  );
}

export default NotFound;
