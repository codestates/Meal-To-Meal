import React, { useEffect } from 'react';
import DonationBox from '../components/MyDonation/DonationBox';
import '../styles/pages/MyDonation.css';

function MyDonation() {
  return (
    <div className="mydonation-container">
      <div className="mydonation-left-container">
        <div className="mydonation-ranking-title">기부현황</div>
        <div className="mydonation-ranking-container">
          <div className="mydonation-ranking-text-container">
            <div className="mydonation-money-total">기부악마'님은 총 ₩3,000,234,100원 기부하셨습니다!</div>
            <div className="mydonation-money-ranking">현재 기부 순위 1등입니다!</div>
          </div>
          <img className="mydonation-money-image" src={require('../img/piggybank.png').default} alt="" />
        </div>
      </div>
      <div className="mydonation-right-container">
        <div className="mydonation-history-title">내 기부 내역</div>
        <div className="mydonation-history-container">
          <DonationBox />
          <DonationBox />
          <DonationBox />
          <DonationBox />
        </div>
      </div>
    </div>
  );
}

export default MyDonation;
