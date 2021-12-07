import React, { useState } from 'react';
import ReviewUploadModal from '../components/OrderCart/ReviewUploadModal';
import OrderedFoodBox from '../components/OrderCart/OrderedFoodBox';
import '../styles/pages/OrderCart.css';

function OrderCart() {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const openReviewModalHandler = () => {
    setReviewModalOpen(!reviewModalOpen);
  };
  return (
    <>
      <div className="ordercart-container">
        <div className="ordercart-title">예약 내역</div>
        <div className="ordercart-store-title-container">
          <img className="ordercart-category-icon" src={require('../img/찌개.png').default} alt="" />
          <div className="ordercart-store-title">원조 할매집</div>
        </div>
        <img className="ordercart-store-image" src={require('../img/dummy/menu_dummy/감자탕.jpg').default} alt="" />
        <div className="ordercart-address-container">
          <i className="fas fa-map-marker-alt" />
          <div className="ordercart-address-text">서울특별시 용산구 이태원동 119-23</div>
        </div>
        <div className="ordercart-description-container">
          <i className="fas fa-utensils" />
          <div className="ordercart-description-text">서울 100년 전통의 국밥! (할머니 안 들어감)</div>
        </div>
        <div className="ordercart-ordered-container">
          <div className="ordercart-ordered-title">주문한 음식</div>
          <OrderedFoodBox />
        </div>
        <div className="ordercart-userinfo-container">
          <div className="ordercart-userinfo-title">주문 유저 정보</div>
          <div className="ordercart-username">'기부악마'님</div>
          <div className="ordercart-user-email">hyeonsi95@naver.com</div>
          <div className="ordercart-user-phone-number">010-1234-5678</div>
        </div>
        <button className="ordercart-confirm-button" onClick={openReviewModalHandler}>
          잘 먹었습니다!
        </button>
        {reviewModalOpen ? <ReviewUploadModal openReviewModalHandler={openReviewModalHandler} /> : null}
      </div>
    </>
  );
}

export default OrderCart;
