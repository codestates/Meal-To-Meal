import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DonationBox() {
  return (
    <div className="donationbox-container">
      <div className="donationbox-title-container">
        <img className="donationbox-category-icon" src={require('../../img/찌개.png').default} alt="" />
        <div className="donationbox-store-name">죠스 스시</div>
        <img className="donationbox-createdat-icon" src={require('../../img/desciption.png').default} alt="" />
        <div className="donationbox-createdat-text">2021-11-23</div>
      </div>
      <div className="donationbox-address-container">
        <img className="donationbox-address-icon" src={require('../../img/marker.png').default} alt="" />
        <div className="donationbox-address-text">서울특별시 중랑구 용마산로115길 108</div>
      </div>
      <div className="donationbox-content-container">
        <img
          className="donationbox-food-image"
          src={require('../../img/dummy/menu_dummy/스프링롤.jpg').default}
          alt=""
        />
        <div className="donationbox-food-info-container">
          <div className="donationbox-food-name">죠스 특선 스시</div>
          <div className="donationbox-food-price">106,800원</div>
          <div className="donationbox-dish-count-container">
            <img className="donationbox-dish-icon" src={require('../../img/donation.png').default} alt="" />
            <div className="donationbox-dish-number"> :3</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonationBox;
