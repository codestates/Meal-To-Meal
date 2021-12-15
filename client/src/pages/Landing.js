import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import '../styles/pages/Landing.css';
import landing1 from '../img/landing/landing1.mp4';

function Landing({ navigate }) {
  const landingAniContainer = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: landingAniContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../img/landing-ani.json'),
    });
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-introduce-ani-container">
        <div className="landing-catchphrase-container">
          <img className="landing-logo-img" src={require('../img/meal-to-meal-logo-192.png').default} alt="" />
          <div className="landing-catchphrase">배고플때는 역시 Meal To Meal</div>
          <div className="landing-catchphrase-sub">
            돈 없는 돼지보다는 그래도 배부른 돼지가 되자! 맨트를 길게 하면 위치를 맞춰 줄 것입니다!
          </div>
          <button className="landing-start-button" onClick={() => navigate('/maps')}>
            지금 시작하기!
          </button>
        </div>
        <div className="landing-ani" ref={landingAniContainer} />
      </div>
      <div className="landing-tutorials-container">
        <div className="landing-tutorial-info-text-container">
          <div className="landing-tutorials-info-title">먹기를 눌러요!</div>
          <div className="landing-tutorials-info-text">개같이 눌러 보아요!! 와다다다다!!!</div>
        </div>
        <video className="landing-tutorials-info-gif" autoPlay loop muted>
          <source src={landing1} type="video/mp4" />
        </video>
      </div>
      <div className="landing-tutorials-container-left">
        <div className="landing-tutorial-info-text-container-left">
          <div className="landing-tutorials-info-title-left">먹기를 눌러요!</div>
          <div className="landing-tutorials-info-text-left">개같이 눌러 보아요!! 와다다다다!!!</div>
        </div>
        <video className="landing-tutorials-info-gif-left" autoPlay loop muted>
          <source src={landing1} type="video/mp4" />
        </video>
      </div>
      <button className="landing-start-button-bottom" onClick={() => navigate('/maps')}>
        지금 시작하기!
      </button>
    </div>
  );
}

export default Landing;
