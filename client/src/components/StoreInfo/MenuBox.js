import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginAlert from '../StoreInfo/LoginAlert';
import ClickOwnStoreAlert from '../Alert/ClickOwnStoreAlert';

function MenuBox({
  navigate,
  setAlertMessage,
  openAlertHandler,
  openWarningAlertHandler,
  isLogin,
  addToCart,
  openLoginModalHandler,
}) {
  const accessToken = localStorage.getItem('accessToken');
  const [isOpenLoginAlert, setIsOpenLoginAlert] = useState(false);

  const loginAlertOpenHandler = () => {
    setIsOpenLoginAlert(!isOpenLoginAlert);
  };
  const [isOpenClickOwnStoreAlert, setIsOpenClickOwnStoreAlert] = useState(false);
  const openClickOwnStoreAlertHandler = () => {
    setIsOpenClickOwnStoreAlert(!isOpenClickOwnStoreAlert);
  };

  const [storeMenu, setStoreMenu] = useState([]);

  const getStoreMenuHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/menu-list/${Number(localStorage.getItem('clickedMarker'))}`, {
        headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(res => {
        setStoreMenu(res.data.menuList);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStoreMenuHandler();
  }, []);

  const checkIsLoginToAddCart = el => {
    if (!isLogin) {
      loginAlertOpenHandler();
    } else {
      setAlertMessage('장바구니에 추가되었습니다');
      openAlertHandler();
      addToCart(el);
    }
  };

  const addUserMeal = el => {
    const accessToken = localStorage.getItem('accessToken');
    if (!isLogin) {
      loginAlertOpenHandler();
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/user-meal`,
          { menu_id: el.id },
          { headers: { authorization: `Bearer ${accessToken}` }, withCredentials: true }
        )
        .then(res => {
          setAlertMessage('선택하신 음식이 예약되었습니다');
          openAlertHandler();
          navigate('/usermeal');
        })
        .catch(err => {
          console.log(err.response.data.message);
          if (err.response.data.message === '인증되지 않은 사용자입니다') {
            setAlertMessage('휴대폰 인증이 필요한 서비스입니다');
            openWarningAlertHandler();
            navigate('/mypage');
          } else if (err.response.data.message === '본인의 가게에서 요청하셨습니다') {
            openClickOwnStoreAlertHandler();
          } else if (err.response.data.message === '이미 주문 내역이 있습니다') {
            setAlertMessage('이미 주문 내역이 있습니다');
            openWarningAlertHandler();
          } else if (err.response.data.message === '오늘은 이미 사용하셨습니다') {
            setAlertMessage('오늘은 이미 사용하셨습니다. 내일 다시 찾아주세요!');
            openWarningAlertHandler();
          } else {
            setAlertMessage('잘못된 요청입니다');
          }
        });
    }
  };

  return (
    <>
      {storeMenu.map(el => (
        <div className="menu-box-container">
          <div className="menu-container">
            <img className="menu-food-image" src={el.menu_image} alt="" />
            <div className="menu-info-container">
              <span className="menu-text">{el.menu_name}</span>
              <span className="menu-text">{Number(el.menu_price).toLocaleString()}원</span>
              <div className="menu-donation-container">
                <img className="menu-donation-icon" src={require('../../img/donation.png').default} alt="" />
                <span className="menu-text">기부받은 그릇 : {el.menu_order_quantity}</span>
              </div>
              <div className="menu-button-container">
                <button
                  className="menu-donate-button"
                  onClick={() => {
                    checkIsLoginToAddCart(el);
                  }}
                >
                  기부하기
                </button>
                {el.menu_order_quantity === 0 ? (
                  <button
                    disabled={true}
                    className="menu-eat-button"
                    onClick={() => {
                      addUserMeal(el);
                    }}
                  >
                    먹기
                  </button>
                ) : (
                  <button
                    className="menu-eat-button"
                    onClick={() => {
                      addUserMeal(el);
                    }}
                  >
                    먹기
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      {isOpenLoginAlert ? (
        <LoginAlert loginAlertOpenHandler={loginAlertOpenHandler} openLoginModalHandler={openLoginModalHandler} />
      ) : null}
      {isOpenClickOwnStoreAlert ? (
        <ClickOwnStoreAlert navigate={navigate} openClickOwnStoreAlertHandler={openClickOwnStoreAlertHandler} />
      ) : null}
    </>
  );
}

export default MenuBox;
