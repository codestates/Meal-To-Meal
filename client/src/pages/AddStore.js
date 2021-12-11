import React from 'react';
import AddMenu from '../components/Management/AddMenu';

import '../styles/pages/AddStore.css';

function AddStore({ navigate }) {
  return (
    <>
      <div className="AddStore-container">
        <div className="AddStore-store-title-container">
          <div className="AddStore-title">가게 정보 등록</div>
          <div className="AddStore-store-img" />
          <input type="file" className="AddStore-store-img-add-input" />
          <div className="AddStore-store-text">상호명</div>
          <input className="AddStore-store-info-input" />
          <div className="AddStore-store-text">카테고리</div>
          <input className="AddStore-store-info-input" />
          <div className="AddStore-store-text">가게 설명</div>
          <textarea className="AddStore-store-description-input" />
        </div>
        <div className="AddStore-store-title-container">
          <div className="AddStore-store-text">영업시간</div>
          <input className="AddStore-store-info-input" />
          <div className="AddStore-store-text">가게주소</div>
          <button className="AddStore-address-button">가게 주소 등록하기</button>
          <input className="AddStore-store-info-input" />
          <div className="AddStore-add-menu-container">
            <div className="AddStore-add-menu-title">메뉴 등록</div>
            <AddMenu />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddStore;
