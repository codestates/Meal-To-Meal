import React from 'react';
import MenuDummydata from '../static/menu_dummydata';

function MenuBox({ cartItem, setCartItem, removeFromCart, addToCart, setQuantity }) {
  return (
    <>
      {MenuDummydata.filter(el => el.store_id === 6).map(el => (
        <div className="menu-box-container">
          <div className="menu-container">
            <img className="menu-food-image" src={el.menu_image} alt="" />
            <div className="menu-info-container">
              <span className="menu-text">{el.menu_name}</span>
              <span className="menu-text">{el.menu_price}</span>
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
                <button className="menu-eat-button">먹기</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default MenuBox;
