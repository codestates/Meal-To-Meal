import axios from 'axios';
import React, { useState } from 'react';
import ReviewUploadModal from '../components/OrderCart/ReviewUploadModal';
import UserMealBox from '../components/OrderCart/UserMealBox';
import EmptyOrderAni from '../components/StoreInfo/EmptyOrderAni';
import '../styles/pages/UserMeal.css';

function UserMeal({ navigate, orderedMeal, setOrderedMeal, detailStoreInfo, setDetailStoreInfo }) {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewInfo, setReviewInfo] = useState({
    reviewImage: '',
    reviewText: '',
  });
  // const [reviewImage, setReviewImage] = useState('');
  // const [reviewText, setReviewText] = useState('');

  const openReviewModalHandler = () => {
    setReviewModalOpen(!reviewModalOpen);
  };

  const reviewSubmitHandler = () => {
    const { reviewImage, reviewText } = reviewInfo;
    const accessToken = localStorage.getItem('accessToken');
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/review`,
        { store_id: detailStoreInfo.store_id, review_image: reviewImage, review_content: reviewText },
        { headers: { authorization: `Bearer ${accessToken}` }, withCredentials: true }
      )
      .then(res => {
        setOrderedMeal({});
        setDetailStoreInfo({});
        alert('리뷰가 등록되었습니다');
        navigate('/maps');
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
              <div className="usermeal-store-title">{detailStoreInfo.store_name}</div>
            </div>
            <img className="usermeal-store-image" src={detailStoreInfo.store_image} alt="" />
            <div className="usermeal-address-container">
              <i className="fas fa-map-marker-alt" />
              <div className="usermeal-address-text">{detailStoreInfo.store_address}</div>
            </div>
            <div className="usermeal-description-container">
              <i className="fas fa-utensils" />
              <div className="usermeal-description-text">{detailStoreInfo.store_description}</div>
            </div>
          </div>
          <div className="usermeal-ordered-info-container">
            <div className="usermeal-ordered-container">
              <div className="usermeal-ordered-title">주문한 음식</div>
              <UserMealBox orderedMeal={orderedMeal} />
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
            orderedMeal={orderedMeal}
            detailStoreInfo={detailStoreInfo}
            reviewInfo={reviewInfo}
            setReviewInfo={setReviewInfo}
          />
        ) : null}
      </div>
    </>
  );
}

export default UserMeal;
