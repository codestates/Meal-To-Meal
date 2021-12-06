import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function Alert({ alertMessage, openAlertHandler }) {
  const alertContainer = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: alertContainer.current,
      renderer: 'svg',
      autoplay: true,
      animationData: require('../img/meat.json'),
    });
  }, []);
  return (
    <div className="alert-container">
      <div className="alert-backdrop" onClick={openAlertHandler}>
        <div className="alert-window" onClick={e => e.stopPropagation()}>
          <div className="alert-animation" ref={alertContainer} />
          <div className="alert-message">{alertMessage}</div>
        </div>
      </div>
    </div>
  );
}

export default Alert;
