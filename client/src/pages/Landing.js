import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import '../styles/pages/Landing.css';
import landing1 from '../img/landing/landing1.mp4';
import landing2 from '../img/landing/landing2.mp4';
import landing3 from '../img/landing/먹기.mp4';

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
          <div className="landing-catchphrase">
            따뜻한 한 끼를
            <br /> 주변의 이웃들과 나누는 작은 기적
          </div>
          <div className="landing-catchphrase-sub">
            나를 위한 한 끼가 아닌 많은 사람들을 위한 한 끼로 전국을 감동으로 물들여봐요
          </div>
          <button className="landing-start-button" onClick={() => navigate('/maps')}>
            지금 시작하기!
          </button>
        </div>
        <div className="landing-ani" ref={landingAniContainer} />
      </div>
      <div className="landing-tutorials-container-right">
        <div className="landing-tutorial-info-text-container-right">
          <div className="landing-tutorials-info-title-right">지도에서 음식점을 찾아보세요</div>
          <div className="landing-tutorials-info-text-right">
            가게이름 또는 주소를 검색하면 전국에 있는 저희 Meal to Meal 가맹점을 찾을 수 있습니다.{' '}
          </div>
        </div>
        <video className="landing-tutorials-info-gif-right" autoPlay loop muted>
          <source src={landing1} type="video/mp4" />
        </video>
      </div>
      <div className="landing-tutorials-container-left">
        <div className="landing-tutorial-info-text-container-left">
          <div className="landing-tutorials-info-title-left">한 끼를 쇼핑하세요</div>
          <div className="landing-tutorials-info-text-left">
            내가 먹은 맛있는 한 끼를 장바구니에 추가하고 다른 사람에게도 한 끼를 선물해보세요
          </div>
        </div>
        <video className="landing-tutorials-info-gif-left" autoPlay loop muted>
          <source src={landing2} type="video/mp4" />
        </video>
      </div>
      <div className="landing-tutorials-container-right">
        <div className="landing-tutorial-info-text-container-right">
          <div className="landing-tutorials-info-title-right">다른 사람이 선물한 한 끼를 즐겨보세요</div>
          <div className="landing-tutorials-info-text-right">
            맛있는 한 끼를 먹고 리뷰를 남겨서 기부에 대한 고마움을 표시하세요
          </div>
        </div>
        <video className="landing-tutorials-info-gif-right" autoPlay loop muted>
          <source src={landing3} type="video/mp4" />
        </video>
      </div>
      <button className="landing-start-button-bottom" onClick={() => navigate('/maps')}>
        지금 시작하기!
      </button>
    </div>
  );
}

export default Landing;
