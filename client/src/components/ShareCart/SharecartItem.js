import React from 'react';

import EmptyCartAni from '../StoreInfo/EmptyCartAni';

function SharecartItem({ cartItems, setCartItems, removeFromCart, navigate }) {
  const quantityMinusHandler = item => {
    if (item.quantity > 1) {
      item.quantity--;
    }
    setCartItems([...cartItems]);
  };

  const quantityPlusHandler = item => {
    if (item.quantity < 100) {
      item.quantity++;
    }
    setCartItems([...cartItems]);
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <EmptyCartAni navigate={navigate} />
      ) : (
        cartItems.map(el => (
          <div className="sharecart-item-container">
            <img className="sharecart-item-img" src={el.img} alt="" />
            <div className="sharecart-item-info-container">
              <div className="sharecart-item-name">{el.name}</div>
              <div className="sharecart-item-price">{Number(el.price).toLocaleString()}원</div>
              <div className="sharecart-item-count-container">
                <i className="fas fa-minus" onClick={() => quantityMinusHandler(el)} />
                <div className="shartcart-cart-number">{el.quantity}</div>
                <i className="fas fa-plus" onClick={() => quantityPlusHandler(el)} />
              </div>
              <div className="delete-button-container">
                <button className="sharecart-delete-button" onClick={() => removeFromCart(el)}>
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default SharecartItem;
