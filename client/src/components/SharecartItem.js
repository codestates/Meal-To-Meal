import React from 'react';

function SharecartItem({ ordernum, onIncrease, onDecrease, deleteBtnHandler, cartItem }) {
  return (
    <>
      {cartItem.map(el => {
        <div className="sharecart-item-container">
          <input className="sharecart-checkbox" type="checkbox" />
          <img className="sharecart-item-img" src={el.menu_image} alt="" />
          <div className="sharecart-item-info-container">
            <div className="sharecart-item-name">{el.menu_name}</div>
            <div className="sharecart-item-price">{el.menu_price}</div>
          </div>
          <div className="sharecart-item-count-container">
            <div className="sharecart-plus-minus-container">
              <i className="fas fa-minus" onClick={onDecrease} />
              <div className="shartcart-cart-number">{ordernum}</div>
              <i className="fas fa-plus" onClick={onIncrease} />
            </div>
            <button className="sharecart-delete-button" onClick={deleteBtnHandler}>
              삭제
            </button>
          </div>
        </div>;
      })}
    </>
  );
}

export default SharecartItem;
