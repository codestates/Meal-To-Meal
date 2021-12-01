import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuBox from '../components/MenuBox';
import ReviewBox from '../components/ReviewBox';
import '../styles/pages/StoreInfo.css';

function StoreInfo({ isLogin, setIsLogin }) {
  const navigate = useNavigate();

  return (
    <>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <div className="storeinfo-container">
        <div className="storeinfo-title">가게 정보</div>
        <div className="storeinfo-title-container">
          <div className="store-title-container">
            <img className="store-category-icon" src={require('../img/찌개.png').default} alt="" />
            <div className="store-title">원조 할매 국밥</div>
          </div>
          <div className="store-category-text">한식</div>
        </div>
        <img className="store-img" src={require('../img/dummy/store1.png').default} alt="" />
        <div className="store-info-container">
          <div className="store-detail-info-container">
            <i className="fas fa-map-marker-alt" />
            <div className="store-detail-info-text">서울특별시 용산구 이태원동 119-23</div>
          </div>
          <div className="store-detail-info-container">
            <i className="fas fa-clock" />
            <div className="store-detail-info-text">10:00 ~ 23:00</div>
          </div>
          <div className="store-detail-info-container">
            <i className="fas fa-utensils" />
            <div className="store-detail-info-text">
              서울 100년 전통의 국밥! (할머니 안 들어감) 근데 들어갈지도 모르는데 정현님 힘내요 왜이렇게 조용해요 자는거
              아니죠? 제발 정신 차려요! 나 너무 심심행
            </div>
          </div>
        </div>
        <div className="box-title">메뉴</div>
        <MenuBox />
        <div className="box-title">리뷰</div>
        <ReviewBox />
        <div className="storeinfo-button-container">
          <button
            className="cart-button"
            onClick={() => {
              navigate('/sharecart');
            }}
          >
            장바구니 (1)
          </button>
          <button
            className="back-button"
            onClick={() => {
              navigate('/map');
            }}
          >
            뒤로 가기
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StoreInfo;
