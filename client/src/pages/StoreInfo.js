import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuBox from '../components/MenuBox';
import ReviewBox from '../components/ReviewBox';
import '../styles/pages/StoreInfo.css';
import axios from 'axios';

function StoreInfo({
  isLogin,
  cartItems,
  setCartItems,
  removeFromCart,
  addToCart,
  setQuantity,
  openLoginModalHandler,
  openSignupModalHandler,
}) {
  const navigate = useNavigate();

  const [detailStoreInfo, setDetailStoreInfo] = useState({});

  const getDetailStoreInfoHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/store/${Number(localStorage.getItem('clickedMarker'))}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(res => {
        setDetailStoreInfo(res.data.storeInfo);
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
              cartItems={cartItems}
              setCartItems={setCartItems}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
              setQuantity={setQuantity}
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
          <button className="back-button" onClick={() => navigate('/map')}>
            뒤로 가기
          </button>
        </div>
      </div>
    </>
  );
}

export default StoreInfo;
