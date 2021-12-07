import React from 'react';
import { useNavigate } from 'react-router-dom';
import SharecartItem from '../components/SharecartItem';
import '../styles/pages/ShareCart.css';

function ShareCart({ cartItems, setCartItems, removeFromCart }) {
  const navigate = useNavigate();

  const itemQuantity = cartItems.map(el => el.quantity);
  const totalQuantity = itemQuantity.reduce((acc, cur) => acc + cur, 0);
  const itemTotalPrice = cartItems.map(el => el.price * el.quantity);
  const totalPrice = itemTotalPrice.reduce((acc, cur) => acc + cur, 0);
  const totalPriceToString = totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

  return (
    <>
      <div className="sharecart-container">
        <div className="sharecart-title">나눔카트</div>
        <SharecartItem
          cartItems={cartItems}
          setCartItems={setCartItems}
          removeFromCart={removeFromCart}
          navigate={navigate}
        />
        <div className="sharecart-order-info-container">
          <div className="sharecart-order-text">주문 합계</div>
          <div className="sharecart-order-count-container">
            <div className="sharecount-count-text">총 상품 개수</div>
            <div className="sharecount-count-text">{totalQuantity}개</div>
          </div>
          <div className="sharecart-order-count-container">
            <div className="sharecount-count-text">총 상품 금액</div>
            <div className="sharecount-count-text">{totalPriceToString}원</div>
          </div>
        </div>
        <div className="sharecart-submit-button-container">
          {cartItems.length === 0 ? (
            <button className="sharecart-button-donation" disabled="true">
              기부하기
            </button>
          ) : (
            <button className="sharecart-button-donation">기부하기</button>
          )}
          <button
            className="sharecart-button"
            onClick={() => {
              navigate(-1);
            }}
          >
            뒤로 가기
          </button>
        </div>
      </div>
    </>
  );
}

export default ShareCart;
