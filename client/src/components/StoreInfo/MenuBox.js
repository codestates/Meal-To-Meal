import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginAlert from '../StoreInfo/LoginAlert';
import ClickOwnStoreAlert from '../Alert/ClickOwnStoreAlert';

function MenuBox({ navigate, isLogin, addToCart, openLoginModalHandler, openSignupModalHandler, setOrderedMeal }) {
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

  const goToOrderHistory = el => {
    if (!isLogin) {
      loginAlertOpenHandler();
    } else {
      setOrderedMeal(el);
      navigate('/usermeal');
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
              <span className="menu-text">
                {el.menu_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}원
              </span>
              <div className="menu-donation-container">
                <img className="menu-donation-icon" src={require('../../img/donation.png').default} alt="" />
                <span className="menu-text">기부받은 그릇 : {el.menu_order_quantity}</span>
              </div>
              <div className="menu-button-container">
                <button
                  className="menu-donate-button"
                  onClick={() => {
                    addToCart(el);
                  }}
                >
                  기부하기
                </button>
                <button
                  className="menu-eat-button"
                  onClick={() => {
                    goToOrderHistory(el);
                    //이걸로 el를 usermeal 페이지로 보낸다
                  }}
                >
                  먹기
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isOpenLoginAlert ? (
        <LoginAlert
          loginAlertOpenHandler={loginAlertOpenHandler}
          openLoginModalHandler={openLoginModalHandler}
          openSignupModalHandler={openSignupModalHandler}
        />
      ) : null}
    </>
  );
}

export default MenuBox;
