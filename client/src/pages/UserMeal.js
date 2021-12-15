import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReviewUploadModal from '../components/OrderCart/ReviewUploadModal';
import UserMealBox from '../components/OrderCart/UserMealBox';
import EmptyOrderAni from '../components/OrderCart/EmptyOrderAni';
import Loading from '../components/Loading';
import '../styles/pages/UserMeal.css';

function UserMeal({ navigate, getImage, emptyOrderAniText, setEmptyOrderAniText }) {
  const accessToken = localStorage.getItem('accessToken');
  const [isLoading, setIsLoading] = useState(true);
  const [orderedMeal, setOrderedMeal] = useState([]);
  const [orderedUser, setOrderedUser] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [icon, setIcon] = useState('');

  const openReviewModalHandler = () => {
    setReviewModalOpen(!reviewModalOpen);
  };

  const getDetailUserMealHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user-meal`, {
        headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(res => {
        setOrderedUser([res.data.matchedUser]);
        setOrderedMeal([res.data.userMeal]);
        setIcon(getImage([res.data.userMeal][0].menu.store.store_category));
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getDetailUserMealHandler();
  }, [icon]);

  return (
    <>
      {orderedMeal.length === 0 || orderedMeal.length === undefined ? (
        <EmptyOrderAni navigate={navigate} />
      ) : (
        <div className="usermeal-container">
          <div className="usermeal-title">예약 내역</div>
          <div className="usermeal-order-food-info-container">
            <div className="usermeal-reservation-container">
              <div className="usermeal-store-title-container">
                <img className="usermeal-category-icon" src={icon} alt="" />
                <div className="usermeal-store-title">{orderedMeal[0].menu.store.store_name}</div>
              </div>
              <div className="usermeal-store-img-container">
                <img className="usermeal-store-image" src={orderedMeal[0].menu.store.store_image} alt="" />
              </div>
              <div className="usermeal-address-container">
                <i className="fas fa-map-marker-alt" />
                <div className="usermeal-address-text">{orderedMeal[0].menu.store.store_address}</div>
              </div>
              <div className="usermeal-description-container">
                <i className="fas fa-utensils" />
                <div className="usermeal-description-text">{orderedMeal[0].menu.store.store_description}</div>
              </div>
            </div>
            <div className="usermeal-ordered-info-container">
              <div className="usermeal-ordered-container">
                <div className="usermeal-ordered-title">주문한 음식</div>
                <UserMealBox orderedMeal={orderedMeal} />
              </div>
              <div className="usermeal-userinfo-title">주문 유저 정보</div>
              <div className="usermeal-userinfo-container">
                <div className="usermeal-user-text">{orderedUser[0].user_nickname}님</div>
                <div className="usermeal-user-text">{orderedUser[0].user_email}</div>
                <div className="usermeal-user-text">{orderedUser[0].user_phone_number}</div>
              </div>
              <button className="usermeal-confirm-button" onClick={openReviewModalHandler}>
                잘 먹었습니다!
              </button>
            </div>
          </div>
          {reviewModalOpen ? (
            <ReviewUploadModal
              navigate={navigate}
              openReviewModalHandler={openReviewModalHandler}
              orderedMeal={orderedMeal}
              setOrderedMeal={setOrderedMeal}
              icon={icon}
            />
          ) : null}
        </div>
      )}
    </>
  );
}

export default UserMeal;
