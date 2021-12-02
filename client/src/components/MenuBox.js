import React from 'react';

function MenuBox() {
  return (
    <div className="menuBox-container">
      <div className="menu-container">
        <img className="menu-food-image" src={require('../img/dummy/원조할매국밥.png').default} alt="" />
        <div className="menu-info-container">
          <span className="menu-text">원조 할매 국밥</span>
          <span className="menu-text">6,800원</span>
          <div className="menu-donation-container">
            <img className="menu-donation-icon" src={require('../img/donation.png').default} alt="" />
            <span className="menu-text">기부받은 그릇 : 3</span>
          </div>
        </div>
        <div className="menu-button-container">
          <button className="menu-donate-button">기부하기</button>
          <button className="menu-eat-button">먹기</button>
        </div>
      </div>
    </div>
  );
}

export default MenuBox;
