import React from 'react';

function SharecartItem({ removeFromCart, cartItems }) {
  console.log(cartItems);

  return (
    <>
      {cartItems.map(el => (
        <div className="sharecart-item-container">
          <input className="sharecart-checkbox" type="checkbox" />
          <img className="sharecart-item-img" src={el.img} alt="" />
          <div className="sharecart-item-info-container">
            <div className="sharecart-item-name">{el.name}</div>
            <div className="sharecart-item-price">{el.price}</div>
          </div>
          <div className="sharecart-item-count-container">
            <div className="sharecart-plus-minus-container">
              <i className="fas fa-minus" onClick={() => el.quantity--} />
              <div className="shartcart-cart-number">{el.quantity}</div>
              <i className="fas fa-plus" onClick={() => el.quantity++} />
            </div>
            <button className="sharecart-delete-button" onClick={() => removeFromCart(el)}>
              삭제
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default SharecartItem;
