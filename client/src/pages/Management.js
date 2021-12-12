import React from 'react';
import ManagementMenuBox from '../components/Management/ManagementMenuBox';
import '../styles/pages/Management.css';

function Management() {
  return (
    <div className="Management-page">
      <div className="management-container">
        <div className="management-store-info-container">
          <div className="management-title">나의 가게 정보</div>
          <div className="management-store-title-container">
            <img className="management-store-category-icon" src={require('../img/찌개.png').default} alt="" />
            <div className="management-store-title">외길통닭</div>
            <div className="management-store-category">한식</div>
          </div>
          <img className="management-store-img" src={require('../img/dummy/store4.png').default} alt="" />
          <div className="management-store-detail-info-container">
            <div className="management-detail-info">
              <img className="management-detail-icon" src={require('../img/marker.png').default} alt=""></img>
              <div className="management-detail-text">서울특별시 용산구 이태원 어쩌구</div>
            </div>
            <div className="management-detail-info">
              <img className="management-detail-icon" src={require('../img/desciption.png').default} alt=""></img>
              <div className="management-detail-text">삼족오도 튀겨 버리겠다!</div>
            </div>
          </div>
        </div>
      </div>
      <div className="management-store-menu-container">
        <div className="management-title">메뉴</div>
        <ManagementMenuBox />
        <ManagementMenuBox />
        <ManagementMenuBox />
        <ManagementMenuBox />
        <div className="management-button-container">
          <button className="management-button">수정</button>
          <button className="management-delete-button">삭제</button>
        </div>
      </div>
    </div>
  );
}

export default Management;
