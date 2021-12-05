import React, { useState } from 'react';
import LoginAlert from '../components/LoginAlert';
import MenuDummydata from '../static/menu_dummydata';

function MenuBox({
  isLogin,
  cartItem,
  setCartItem,
  removeFromCart,
  addToCart,
  setQuantity,
  openLoginModalHandler,
  openSignupModalHandler,
}) {
  const [isOpenLoginAlert, setIsOpenLoginAlert] = useState(false);
  const loginAlertOpenHandler = () => {
    setIsOpenLoginAlert(!isOpenLoginAlert);
  };

  const goToorderHistory = () => {
    if (!isLogin) {
      loginAlertOpenHandler();
    } else {
      console.log('로그인 되어있는 상태이면 먹기 페이지로 가시오');
    }
  };

  return (
    <>
      {MenuDummydata.filter(el => el.store_id === 3).map(el => (
        <div className="menu-box-container">
          <div className="menu-container">
            <img className="menu-food-image" src={el.menu_image} alt="" />
            <div className="menu-info-container">
              <span className="menu-text">{el.menu_name}</span>
              <span className="menu-text">
                {el.menu_price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}원
              </span>
              <div className="menu-donation-container">
                <img className="menu-donation-icon" src={require('../img/donation.png').default} alt="" />
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
                <button className="menu-eat-button" onClick={goToorderHistory}>
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
