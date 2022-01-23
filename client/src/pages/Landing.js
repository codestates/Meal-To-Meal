import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import '../styles/pages/Landing.css';
import landing1 from '../img/landing/Landing1.gif';
import landing2 from '../img/landing/Landing2.gif';
import landing3 from '../img/landing/Landing3.gif';
import landing4 from '../img/landing/Landing4.gif';

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
            <p>내가 먹은 맛있는 한 끼를 다른 사람에게도 나눌 수 있는</p>
            <p>음식 기부 & 예약 서비스 Meal To Meal 입니다</p>
          </div>
          <button className="landing-start-button" onClick={() => navigate('/maps')}>
            지금 시작하기
          </button>
        </div>
        <div className="landing-ani" ref={landingAniContainer} />
      </div>
      <div className="landing-introduce-container">
        <div className="landing-introduce-box">
          <img className="landing-introduce-img" src={require('../img/Order food-bro.png').default} alt="" />
          <div className="landing-catchphrase">기부해보실래요?</div>
          <div className="landing-catchphrase-sub">
            맛있게 먹을 누군가를 상상하면서 음식을 골라보세요 소액만으로도 기부에 참여할 수 있어요. 선한 영향력을
            보여주세요 😎
          </div>
        </div>
        <div className="landing-introduce-box">
          <img className="landing-introduce-img" src={require('../img/Hamburger-bro.png').default} alt="" />
          <div className="landing-catchphrase">맛있는 한 끼를 드시고 싶으신가요?</div>
          <div className="landing-catchphrase-sub">
            휴대폰 인증을 하면 먹기 기능은 하루에 한 번, 누구에게나 열려 있어요 맛있게 드신 후 리뷰 작성은 필수예요 🥰
          </div>
        </div>
        <div className="landing-introduce-box">
          <img className="landing-introduce-img" src={require('../img/Mobile payments-bro.png').default} alt="" />
          <div className="landing-catchphrase">사장님이신가요?</div>
          <div className="landing-catchphrase-sub">
            가게를 등록해보세요. 리뷰를 많이 받은 가게는 맛집으로 소문날 수 있어요 본인의 가게에도 기부하실 수 있답니다
            👍🏻
          </div>
        </div>
      </div>
      <div className="landing-tutorials-container-right">
        <div className="landing-tutorial-info-text-container-right">
          <div className="landing-tutorials-info-title-right">지도에서 음식점을 찾아보세요</div>
          <div className="landing-tutorials-info-text-right">
            가게 이름 또는 주소를 검색하면
            <br />
            전국에 있는 Meal to Meal 가맹점을 찾을 수 있어요{' '}
          </div>
        </div>
        <img className="landing-tutorials-info-gif-right" src={landing1} alt="" />
      </div>
      <div className="landing-tutorials-container-left">
        <div className="landing-tutorial-info-text-container-left">
          <div className="landing-tutorials-info-title-left">한 끼를 구매하세요</div>
          <div className="landing-tutorials-info-text-left">
            내가 먹은 맛있는 한 끼를 장바구니에 추가해서 결제하고
            <br />
            다른 사람에게 한 끼를 기부해보세요
          </div>
        </div>
        <img className="landing-tutorials-info-gif-left" src={landing2} alt="" />
      </div>
      <div className="landing-tutorials-container-right">
        <div className="landing-tutorial-info-text-container-right">
          <div className="landing-tutorials-info-title-right">다른 사람이 선물한 한 끼를 예약하세요</div>
          <div className="landing-tutorials-info-text-right">
            맛있는 한 끼를 먹고 리뷰를 남겨서 기부에 대한 고마움을 표시하세요
          </div>
        </div>
        <img className="landing-tutorials-info-gif-right" src={landing3} alt="" />
      </div>
      <div className="landing-tutorials-container-left">
        <div className="landing-tutorial-info-text-container-left">
          <div className="landing-tutorials-info-title-left">사장님이라면 가게를 등록해보세요</div>
          <div className="landing-tutorials-info-text-left">
            가게의 정보와 메뉴들을 자유롭게 수정하여 관리하고
            <br />
            고객들이 남긴 리뷰로 맛집이 될 수 있어요
          </div>
        </div>
        <img className="landing-tutorials-info-gif-left" src={landing4} alt="" />
      </div>
      <button className="landing-start-button-bottom" onClick={() => navigate('/maps')}>
        지금 시작하기!
      </button>
    </div>
  );
}

export default Landing;
