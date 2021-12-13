import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SharecartItem from '../components/ShareCart/SharecartItem';
import ThankAlert from '../components/Alert/ThankAlert';
import '../styles/pages/ShareCart.css';
import axios from 'axios';

function ShareCart({ cartItems, setCartItems, removeFromCart, getImage }) {
  const navigate = useNavigate();

  const [isOpenThankAlert, setIsOpenThankAlert] = useState(false);
  const [payName, setPayName] = useState('');

  const openThankAlertHandler = () => {
    setIsOpenThankAlert(!isOpenThankAlert);
    setTimeout(() => setIsOpenThankAlert(false), 1800);
  };

  const itemQuantity = cartItems.map(el => el.quantity);
  const totalQuantity = itemQuantity.reduce((acc, cur) => acc + cur, 0);
  const itemTotalPrice = cartItems.map(el => el.price * el.quantity);
  const totalPrice = itemTotalPrice.reduce((acc, cur) => acc + cur, 0);
  const totalPriceToString = Number(totalPrice).toLocaleString();

  const makePayNameHandler = () => {
    if (cartItems.length === 0) setPayName('');
    else if (cartItems.length === 1) setPayName(`${cartItems[0].name} ${totalQuantity}개`);
    else setPayName(`${cartItems[0].name} 외 ${totalQuantity - 1}개`);
  };

  useEffect(() => {
    makePayNameHandler();
  }, [cartItems]);

  function requestPay() {
    const IMP = window.IMP; // 생략 가능
    IMP.init('imp49046982');
    const accessToken = localStorage.getItem('accessToken');

    IMP.request_pay(
      {
        // param
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: 'Sudo_Hired_' + new Date(),
        name: payName,
        amount: Number(totalPrice),
        buyer_tel: '010-0000-0000',
      },
      function (rsp) {
        // callback
        if (rsp.success) {
          axios
            .post(
              `${process.env.REACT_APP_API_URL}/payment/complete`,
              { imp_uid: rsp.imp_uid, merchant_uid: rsp.merchant_uid, order: cartItems, total_price: totalPrice },
              {
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
              }
            )
            .then(res => {
              axios
                .post(
                  `${process.env.REACT_APP_API_URL}/cart`,
                  { order: cartItems, total_price: totalPrice },
                  { headers: { authorization: `Bearer ${accessToken}` }, withCredentials: true }
                )
                .then(res => {
                  openThankAlertHandler();
                })
                .catch(err => console.log(err));
            })
            .catch(err => {
              console.log(err);
              alert('잘못된 요청입니다');
            });
        } else {
          // 결제 실패 시 로직,
        }
      }
    );
  }

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
            <button className="sharecart-button" disabled="true">
              기부하기
            </button>
          ) : (
            <button className="sharecart-button" onClick={requestPay}>
              기부하기
            </button>
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
      {isOpenThankAlert ? <ThankAlert navigate={navigate} /> : null}
    </>
  );
}

export default ShareCart;
