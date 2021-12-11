import React from 'react';

function ManagementMenuBox() {
  return (
    <div className="management-menu-container">
      <img className="management-menu-img" src={require('../../img/dummy/store5.png').default} alt="" />
      <div className="management-menu-info-container">
        <div className="management-menu-title-container">
          <div className="management-menu-name">원조 옛날통닭</div>
          <div className="management-menu-price">6.800원</div>
        </div>
        <div className="management-menu-donation-container">
          <img className="management-menu-icon" src={require('../../img/donation.png').default} alt="" />
          <div className="management-menu-text">: 3</div>
        </div>
        <div className="management-menu-code-container">
          <img className="management-menu-code-icon" src={require('../../img/code.png').default} alt="" />
          <div className="management-menu-text">: 1309478</div>
        </div>
      </div>
    </div>
  );
}

export default ManagementMenuBox;
