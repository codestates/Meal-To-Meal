import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/StoreInfo.css';

function StoreInfo({ isLogin, setIsLogin }) {
  return (
    <div className="storeinfo-pagecontainer">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <div className="storeinfo-box">
        <div className="box-container">
          <div className="storeinfo-title">가게 정보</div>
        </div>
        <div className="box-container">
          <img className="storeinfo-categoryimage" src={require('../img/찌개.png').default} alt="" />
          <div className="storeinfo-storename">원조 할매 국밥</div>
          <div className="storeinfo-category">한식</div>
        </div>
        <div className="box-container">
          <img className="storeinfo-storeimage" src={require('../img/dummy/store1.png').default} alt="" />
        </div>
        <div className="box-container">
          <img className="storeinfo-icon" src={require('../img/location.png').default} alt="" />
          <div className="storeinfo-address">서울특별시 용산구 이태원동 119-23</div>
          <img className="storeinfo-icon" src={require('../img/businesshour.png').default} alt="" />
          <div className="storeinfo-businesshour">10:00 ~ 23:00</div>
        </div>
        <div className="box-container">
          <img className="storeinfo-icon" src={require('../img/desciption.png').default} alt="" />
          <div className="storeinfo-description">서울 100년 전통의 국밥! (할머니 안 들어감)</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StoreInfo;
