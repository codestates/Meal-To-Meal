import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBox from '../components/StoreInfo/MenuBox';
import ReviewBox from '../components/StoreInfo/ReviewBox';
import '../styles/pages/StoreInfo.css';
import axios from 'axios';

function StoreInfo({
  navigate,
  isLogin,
  addToCart,
  openLoginModalHandler,
  openSignupModalHandler,
  detailStoreInfo,
  setDetailStoreInfo,
}) {
  const [categoryIcon, getCategoryIcon] = useState('');
  const getCategoryTitle = no => {
    if (no === 1) return '../img/category/분식.png';
    if (no === 2) return '../img/category/빵.png';
    if (no === 3) return '../img/category/야식.png';
    if (no === 4) return '../img/category/양식.png';
    if (no === 5) return '../img/category/일식.png';
    if (no === 6) return '../img/category/중식.png';
    if (no === 7) return '../img/category/패스트푸드.png';
    if (no === 8) return '../img/category/한식.png';
  };

  const getDetailStoreInfoHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/store/${Number(localStorage.getItem('clickedMarker'))}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(res => {
        setDetailStoreInfo(res.data.storeInfo);
        console.log(res.data.storeInfo);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetailStoreInfoHandler();
  }, []);

  return (
    <>
      <div className="storeinfo-page-container">
        <div className="storeinfo-info-menu-review-container">
          <div className="storeinfo-info-container">
            <div className="storeinfo-title">가게 정보</div>
            <div className="storeinfo-title-container">
              <div className="store-title-container">
                <img className="store-category-icon" src={require('../img/찌개.png').default} alt="" />
                {/* src={require('../img/찌개.png').default} */}
                <div className="store-title">{detailStoreInfo.store_name}</div>
              </div>
              <div className="store-category-text">{detailStoreInfo.store_category}</div>
            </div>
            <div className="store-img-info-container">
              <img className="store-img" src={detailStoreInfo.store_image} alt="" />
              <div className="store-info-container">
                <div className="store-detail-info-container">
                  <i className="fas fa-map-marker-alt" />
                  <div className="store-detail-info-text">{detailStoreInfo.store_address}</div>
                </div>
                <div className="store-detail-info-container">
                  <i className="fas fa-clock" />
                  <div className="store-detail-info-text">{detailStoreInfo.business_hour}</div>
                </div>
                <div className="store-detail-info-container">
                  <i className="fas fa-utensils" />
                  <div className="store-detail-info-text">{detailStoreInfo.store_description}</div>
                </div>
              </div>
            </div>
            <div className="box-title">메뉴</div>
            <MenuBox
              navigate={navigate}
              addToCart={addToCart}
              isLogin={isLogin}
              openLoginModalHandler={openLoginModalHandler}
              openSignupModalHandler={openSignupModalHandler}
            />
          </div>
          <div className="menu-box-container">
            <div className="box-title">리뷰</div>
            <ReviewBox />
          </div>
        </div>
        <div className="storeinfo-button-container">
          <button className="cart-button" onClick={() => navigate('/sharecart')}>
            장바구니
          </button>
          <button className="cart-button" onClick={() => navigate('/maps')}>
            뒤로 가기
          </button>
        </div>
      </div>
    </>
  );
}

export default StoreInfo;
