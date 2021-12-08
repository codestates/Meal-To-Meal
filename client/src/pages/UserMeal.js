import axios from 'axios';
import React, { useState } from 'react';
import ReviewUploadModal from '../components/OrderCart/ReviewUploadModal';
import UserMealBox from '../components/OrderCart/UserMealBox';
import EmptyOrderAni from '../components/StoreInfo/EmptyOrderAni';
import '../styles/pages/UserMeal.css';

function UserMeal() {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const openReviewModalHandler = () => {
    setReviewModalOpen(!reviewModalOpen);
  };

  const reviewSubmitHandler = () => {
    const accessToken = localStorage.getItem('accessToken');
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/review`,
        // { store_id, review_image, review_content },
        { headers: { authorization: `Bearer ${accessToken}` }, withCredentials: true }
      )
      .then(res => {
        alert('리뷰가 등록되었습니다');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="usermeal-container">
        <div className="usermeal-order-food-info-container">
          <div className="usermeal-reservation-container">
            <div className="usermeal-title">예약 내역</div>
            <div className="usermeal-store-title-container">
              <img className="usermeal-category-icon" src={require('../img/찌개.png').default} alt="" />
              <div className="usermeal-store-title">원조 할매집</div>
            </div>
            <img className="usermeal-store-image" src={require('../img/dummy/menu_dummy/감자탕.jpg').default} alt="" />
            <div className="usermeal-address-container">
              <i className="fas fa-map-marker-alt" />
              <div className="usermeal-address-text">서울특별시 용산구 이태원동 119-23</div>
            </div>
            <div className="usermeal-description-container">
              <i className="fas fa-utensils" />
              <div className="usermeal-description-text">서울 100년 전통의 국밥! (할머니 안 들어감)</div>
            </div>
          </div>
          <div className="usermeal-ordered-info-container">
            <div className="usermeal-ordered-container">
              <div className="usermeal-ordered-title">주문한 음식</div>
              <UserMealBox />
            </div>
            <div className="usermeal-userinfo-container">
              <div className="usermeal-userinfo-title">주문 유저 정보</div>
              <div className="usermeal-username">'기부악마'님</div>
              <div className="usermeal-user-email">hyeonsi95@naver.com</div>
              <div className="usermeal-user-phone-number">010-1234-5678</div>
            </div>
          </div>
        </div>
        <button className="usermeal-confirm-button" onClick={openReviewModalHandler}>
          잘 먹었습니다!
        </button>

        {reviewModalOpen ? (
          <ReviewUploadModal
            openReviewModalHandler={openReviewModalHandler}
            reviewSubmitHandler={reviewSubmitHandler}
          />
        ) : null}
      </div>
    </>
  );
}

export default UserMeal;
