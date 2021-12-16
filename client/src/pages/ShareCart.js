import React, { useState, useEffect } from 'react';
import SharecartItem from '../components/ShareCart/SharecartItem';
import ThankAlert from '../components/Alert/ThankAlert';
import '../styles/pages/ShareCart.css';
import axios from 'axios';

function ShareCart({
  navigate,
  cartItems,
  setCartItems,
  removeFromCart,
  getImage,
  openWarningAlertHandler,
  setAlertMessage,
}) {
  const accessToken = localStorage.getItem('accessToken');

  const [isOpenThankAlert, setIsOpenThankAlert] = useState(false);
  const [payName, setPayName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const openThankAlertHandler = () => {
    setIsOpenThankAlert(!isOpenThankAlert);
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

  const getUserPhoneHandler = () => {
    if (!accessToken) {
      return;
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/mypage`, {
          headers: { authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        })
        .then(res => {
          if (res.data.userInfo.user_phone_number === null) {
            setAlertMessage('휴대폰 인증이 필요한 서비스입니다.');
            openWarningAlertHandler();
            navigate('/mypage');
          } else {
            setUserPhone(res.data.userInfo.user_phone_number);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    makePayNameHandler();
    getUserPhoneHandler();
  }, [cartItems]);

  const phoneFormat = `${userPhone.slice(0, 3)}-${userPhone.slice(3, 7)}-${userPhone.slice(7, 11)}`;

  function requestPay() {
    const IMP = window.IMP; // 생략 가능
    IMP.init('imp49046982');

    IMP.request_pay(
      {
        // param
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: 'Sudo_Hired_' + new Date(),
        name: payName,
        amount: Number(totalPrice),
        buyer_tel: phoneFormat,
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
              setAlertMessage('잘못된 요청입니다.');
              openWarningAlertHandler();
            });
        } else {
          setAlertMessage('결제에 실패하였습니다.');
          openWarningAlertHandler();
        }
      }
    );
  }

  return (
    <>
      <div className="sharecart-container">
        <div className="sharecart-cartItems-container">
          <div className="sharecart-item-list-container">
            <div className="sharecart-title">나눔카트</div>
            <SharecartItem
              cartItems={cartItems}
              setCartItems={setCartItems}
              removeFromCart={removeFromCart}
              navigate={navigate}
            />
          </div>
          <div className="sharecart-order-info-container">
            <div className="sharecart-order-count-container">
              <div className="sharecount-count-text">총 상품 개수</div>
              <div className="sharecount-count-number">{totalQuantity}개</div>
            </div>
            <div className="sharecart-order-count-container">
              <div className="sharecount-count-text">총 상품 금액</div>
              <div className="sharecount-count-number">{totalPriceToString}원</div>
            </div>
            <img className="sharecart-img" src={require('../img/Cooking-bro.png').default} alt="" />
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
