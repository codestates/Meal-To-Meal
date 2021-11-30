import React from 'react';

function MenuBox() {
  return (
    <div className="menuBox-container">
      <div className="menuBox-title">메뉴</div>
      <div className="menuBox-menu-container">
        <img className="storeinfo-food-image" src={require('../img/dummy/원조할매국밥.png').default} alt="" />
        <div className="menuBox-info-container">
          <div className="menuBox-food-name">원조 할매 국밥</div>
          <div className="menuBox-food-price">6,800원</div>
          <div className="menuBox-donation-container">
            <img className="storeinfo-icon" src={require('../img/donation.png').default} alt="" />
            <div className="menuBox-food-remain">현재 기부한 그릇 수 : 3</div>
          </div>
          <div className="menuBox-button-container">
            <button className="menuBox-Donatebutton">기부하기</button>
            <button className="menuBox-Eatbutton">먹기</button>
          </div>
        </div>
      </div>
      <div className="menuBox-menu-container">
        <img className="storeinfo-food-image" src={require('../img/dummy/원조할매국밥.png').default} alt="" />

        <div className="menuBox-info-container">
          <div className="menuBox-food-name">원조 할매 국밥</div>
          <div className="menuBox-food-price">6,800원</div>
          <div className="menuBox-donation-container">
            <img className="storeinfo-icon" src={require('../img/donation.png').default} alt="" />
            <div className="menuBox-food-remain">현재 기부한 그릇 수 : 3</div>
          </div>
          <div className="menuBox-button-container">
            <button className="menuBox-Donatebutton">기부하기</button>
            <button className="menuBox-Eatbutton">먹기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuBox;
