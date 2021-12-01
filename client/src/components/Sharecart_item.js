import React from 'react';

function Sharecart_item({ ordernum, onIncrease, onDecrease, deleteBtnHandler }) {
  return (
    <div className="sharecart-item-container">
      <input className="sharecart-checkbox" type="checkbox" />
      <img className="sharecart-item-img" src={require('../img/dummy/원조할매국밥.png').default} alt="" />
      <div className="sharecart-item-info-container">
        <div className="sharecart-item-name">원조 할아버지 국밥</div>
        <div className="sharecart-item-price">6,800원</div>
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
    </div>
  );
}

export default Sharecart_item;
