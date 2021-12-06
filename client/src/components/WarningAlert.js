import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function WarningAlert({ alertMessage, openWarningAlertHandler }) {
  const warningAlertContainer = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: warningAlertContainer.current,
      renderer: 'svg',
      autoplay: true,
      animationData: require('../img/fork and knife.json'),
    });
  }, []);
  return (
    <div className="alert-container">
      <div className="alert-backdrop" onClick={openWarningAlertHandler}>
        <div className="alert-window" onClick={e => e.stopPropagation()}>
          <div className="alert-animation" ref={warningAlertContainer} />
          <div className="alert-message">{alertMessage}</div>
        </div>
      </div>
    </div>
  );
}

export default WarningAlert;
