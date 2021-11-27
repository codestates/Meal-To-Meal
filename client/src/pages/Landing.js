import React from 'react';
import '../styles/pages/Landing.css';

import Footer from '../components/Footer';

function Landing() {
  return (
    <>
      <div className="landing-container">
        <div className="landing-catchphrase">내가 먹은 맛있는 한 끼를</div>
        <div className="landing-catchphrase-02">다른 사람에게도 나눌 수 있는</div>
        <img className="landing-logo" src={require('../img/meal-to-meal-logo-512.png').default} alt="" />
        <button className="landing-button">지금 시작하기</button>
        <img className="landing-img" src={require('../img/Deconstructed food-bro.png').default} alt="" />
        <img className="landing-img-02" src={require('../img/Hamburger-bro.png').default} alt="" />
        <img className="landing-img-03" src={require('../img/Refund-bro.png').default} alt="" />

        {/* 튜토리얼 */}
        <div className="landing-tutorial-container">
          <div className="landing-tutorial-gif" />
          <div className="landing-tutorial-catchphrase-container">
            <div className="landing-tutorial-catchphrase">지도에서 음식점을 확인하세요</div>
            <div className="landing-tutorial-catchphrase-sub">
              어떤 음식점에 어떤 기부된 음식이 있는 리뷰를 보면서 확인하고 예약을 잡아 두세요.
            </div>
          </div>
        </div>
        <div className="landing-tutorial-container">
          <div className="landing-tutorial-catchphrase-container">
            <div className="landing-tutorial-catchphrase">먹고싶은 음식을 선택하고 주문내역을 받으세요</div>
            <div className="landing-tutorial-catchphrase-sub">
              받은 주문내역을 가지고 가게로 가서 사장님께 보여주고 한끼를 대접 받으세요
            </div>
          </div>
          <div className="landing-tutorial-gif" />
        </div>
        <div className="landing-tutorial-container">
          <div className="landing-tutorial-gif" />
          <div className="landing-tutorial-catchphrase-container">
            <div className="landing-tutorial-catchphrase">맛있게 드시고 리뷰를 남겨주세요</div>
            <div className="landing-tutorial-catchphrase-sub">
              남긴 리뷰는 다른 한끼를 먹는 사람에게도 도움이 되고 가게 사장님께도 따뜻한 마음을 전하며, 리뷰의 양과
              갯수는 맛집의 증거가 됩니다!
            </div>
          </div>
        </div>
        <div className="landing-tutorial-container">
          <div className="landing-tutorial-catchphrase-container">
            <div className="landing-tutorial-catchphrase">기부 랭킹을 통해 경쟁을 시작 하세요</div>
            <div className="landing-tutorial-catchphrase-sub">
              경쟁을 통해 누가 얼마나 많이 사람들을 도왔는지 알아보고 서로 즐기며 더욱 기부에 열정을 높여봅시다.
            </div>
          </div>
          <div className="landing-tutorial-gif" />
        </div>
        <div className="landing-tutorial-container">
          <div className="landing-tutorial-gif" />
          <div className="landing-tutorial-catchphrase-container">
            <div className="landing-tutorial-catchphrase">맛있는 음식을 기부하여 직접 나눔을 실천하세요</div>
            <div className="landing-tutorial-catchphrase-sub">
              맛있게 대접받은 한끼를 다른 사람들에게도 기부하여 나누고 굶는 사람이 없는 아름다운 세상을 만들어 봅시다!
            </div>
          </div>
        </div>

        {/* 리뷰 */}
        <div className="landing-review-container">
          <div className="landing-review-post-container">
            <div className="landing-review-post-title">티라노 립아이</div>
            <div className="landing-review-post-img"></div>
            <div className="landing-review-post-contents">
              너무 맛있게 잘 먹었습니다. 사장님이 맛있고 음식이 친절해요!
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Landing;
