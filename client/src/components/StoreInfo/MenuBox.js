import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginAlert from '../StoreInfo/LoginAlert';
import ClickOwnStoreAlert from '../Alert/ClickOwnStoreAlert';

function MenuBox({
  navigate,
  setAlertMessage,
  openAlertHandler,
  isLogin,
  addToCart,
  openLoginModalHandler,
  openSignupModalHandler,
}) {
  const [isOpenLoginAlert, setIsOpenLoginAlert] = useState(false);

  const loginAlertOpenHandler = () => {
    setIsOpenLoginAlert(!isOpenLoginAlert);
  };

  const [isOpneClickOwnStoreAlert, setIsOpneClickOwnStoreAlert] = useState(false);
  const openClickOwnStoreAlertHandler = () => {
    setIsOpneClickOwnStoreAlert(!isOpneClickOwnStoreAlert);
  };
  // TODO: 서버에서 가게 주인 아이디 확인해서 누른 사람이랑 같으면 openClickOwnStoreAlertHandler를 true로
  // TODO: 즉 먹기를 눌렀을때 분기를 나눠야 한다.

  const [storeMenu, setStoreMenu] = useState([]);

  const getStoreMenuHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/menu-list/${Number(localStorage.getItem('clickedMarker'))}`, {
        headers: { 'Content-Type': 'application/json' },
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
          console.log(err);
          setAlertMessage('오늘은 이미 티켓을 쓰셨네요! 내일 다시 이용해주세요');
          openAlertHandler();
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
    </>
  );
}

export default MenuBox;
