import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import MenuBox from '../components/StoreInfo/MenuBox';
import ReviewBox from '../components/StoreInfo/ReviewBox';
import '../styles/pages/StoreInfo.css';
import axios from 'axios';

function StoreInfo({
  navigate,
  setAlertMessage,
  isLogin,
  addToCart,
  openAlertHandler,
  openWarningAlertHandler,
  openLoginModalHandler,
  openSignupModalHandler,
  detailStoreInfo,
  setDetailStoreInfo,
  issueTokens,
}) {
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');

  const markerAddressHandler = (lat, lng) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=ko&key=${process.env.REACT_APP_GEOCODING_KEY}`,
        { withCredentials: false }
      )
      .then(res => {
        setAddress(res.data.results[0].formatted_address.slice(4));
      });
  };

  const getDetailStoreInfoHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/store/${Number(localStorage.getItem('clickedMarker'))}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(res => {
        setDetailStoreInfo(res.data.storeInfo);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetailStoreInfoHandler();
    markerAddressHandler(Number(detailStoreInfo.store_lat), Number(detailStoreInfo.store_lng));
  }, [address]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="storeinfo-page-container">
          <div className="storeinfo-info-menu-review-container">
            <div className="storeinfo-info-container">
              <div className="storeinfo-title">가게 정보</div>
              <div className="storeinfo-title-container">
                <div className="store-title-container">
                  <img
                    className="store-category-icon"
                    src={require(`../img/category/${detailStoreInfo.store_category}.png`).default}
                    alt=""
                  />
                  <div className="store-title">{detailStoreInfo.store_name}</div>
                </div>
                <div className="store-category-text">{detailStoreInfo.store_category}</div>
              </div>
              <div className="store-img-info-container">
                <img className="store-img" src={detailStoreInfo.store_image} alt="" />
                <div className="store-info-container">
                  <div className="store-detail-info-container">
                    <i className="fas fa-map-marker-alt" />
                    <div className="store-detail-info-text">{address}</div>
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
                issueTokens={issueTokens}
                navigate={navigate}
                setAlertMessage={setAlertMessage}
                addToCart={addToCart}
                isLogin={isLogin}
                openAlertHandler={openAlertHandler}
                openWarningAlertHandler={openWarningAlertHandler}
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
            <button
              className="cart-button"
              onClick={() => {
                navigate('/sharecart');
              }}
            >
              장바구니
            </button>
            <button className="cart-button" onClick={() => navigate('/maps')}>
              뒤로 가기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default StoreInfo;
