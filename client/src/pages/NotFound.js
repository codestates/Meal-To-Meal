import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

import Header from '../components/Header';
import Footer from '../components/Footer';

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
      <Header />
      <div className="animation-container">
        <div className="notfound-animation" ref={notfoundcontainer} />
        <div className="notfound-catchphrase">페이지를 찾을 수 없습니다.</div>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
