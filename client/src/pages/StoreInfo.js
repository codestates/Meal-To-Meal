import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuBox from '../components/MenuBox';
import ReviewBox from '../components/ReviewBox';
import '../styles/pages/StoreInfo.css';
import StoreDummydata from '../static/store_dummydata';

function StoreInfo({ isLogin, setIsLogin, cartItem, setCartItem, donationClickhandler }) {
  const navigate = useNavigate();
  //카테고리 아이콘 연결하기
  // useEffect(() => {
  //   setCartItem();
  // }, []);

  return (
    <>
      <Header />
      {StoreDummydata.filter(el => el.id === 2).map(el => (
        <div className="storeinfo-page-container">
          <div className="storeinfo-info-menu-review-container">
            <div className="storeinfo-info-container">
              <div className="storeinfo-title">가게 정보</div>
              <div className="storeinfo-title-container">
                <div className="store-title-container">
                  <img className="store-category-icon" src={require('../img/찌개.png').default} alt="" />
                  <div className="store-title">{el.store_name}</div>
                </div>
                <div className="store-category-text">{el.store_category}</div>
              </div>
              <div className="store-img-info-container">
                <img className="store-img" src={el.store_image} alt="" />
                <div className="store-info-container">
                  <div className="store-detail-info-container">
                    <i className="fas fa-map-marker-alt" />
                    <div className="store-detail-info-text">{el.store_address}</div>
                  </div>
                  <div className="store-detail-info-container">
                    <i className="fas fa-clock" />
                    <div className="store-detail-info-text">{el.business_hour}</div>
                  </div>
                  <div className="store-detail-info-container">
                    <i className="fas fa-utensils" />
                    <div className="store-detail-info-text">{el.store_description}</div>
                  </div>
                </div>
              </div>
              <div className="box-title">메뉴</div>
              <MenuBox setCartItem={setCartItem} donationClickhandler={donationClickhandler} />
            </div>
            <div className="menu-box-container">
              <div className="box-title">리뷰</div>
              <ReviewBox />
            </div>
          </div>
          <div className="storeinfo-button-container">
            <button
              className="cart-button"
              onClick={() => {
                navigate('/sharecart');
              }}
            >
              장바구니
            </button>
            <button className="back-button">뒤로 가기</button>
          </div>
        </div>
      ))}
      <Footer />
    </>
  );
}

export default StoreInfo;
