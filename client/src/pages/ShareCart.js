import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SharecartItem from '../components/SharecartItem';
import '../styles/pages/ShareCart.css';

function ShareCart({ isLogin, setIsLogin, cartItem, setCartItem }) {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState(1);

  useEffect(() => {
    setOrderNumber(orderNumber);
  });
  console.log(cartItem);
  const onIncrease = () => {
    setOrderNumber(orderNumber + 1);
  };
  const onDecrease = () => {
    if (orderNumber > 1) {
      setOrderNumber(orderNumber - 1);
    } else {
      setOrderNumber(1);
    }
  };
  const deleteBtnHandler = () => {
    setCartItem({});
    navigate('/storeinfo');
  };

  return (
    <>
      <Header />
      <div className="sharecart-container">
        <div className="sharecart-title">나눔카트</div>
        <div className="sharecart-allcheck-container">
          <input className="sharecart-allcheck-input" type="checkbox" />
          <div className="sharecart-allcheck-text">전체 선택</div>
        </div>
        <SharecartItem
          orderNumber={orderNumber}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          cartItem={cartItem}
          deleteBtnHandler={deleteBtnHandler}
        />
        <div className="sharecart-order-info-container">
          <div className="sharecart-order-text">주문 합계</div>
          <div className="sharecart-order-count-container">
            <div className="sharecount-count-text">총 상품 개수</div>
            <div className="sharecount-count-text">5개</div>
          </div>
          <div className="sharecart-order-count-container">
            <div className="sharecount-count-text">총 상품 금액</div>
            <div className="sharecount-count-text">83,800원</div>
          </div>
        </div>
        <div className="sharecart-submit-button-container">
          <button className="sharecart-donation-button">기부하기</button>
          <button
            className="sharecart-back-button"
            onClick={() => {
              navigate('/storeinfo');
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

export default ShareCart;
