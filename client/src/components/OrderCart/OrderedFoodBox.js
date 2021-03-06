import React from 'react';

function OrderedFoodBox() {
  return (
    <div className="ordered-food-container">
      <img className="ordered-food-image" src={require('../../img/dummy/menu_dummy/매운돈까스.jpg').default} alt="" />
      <div className="ordered-food-info-container">
        <div className="ordered-food-info-title-container">
          <div className="ordered-food-name">매운 돈까스</div>
          <div className="ordered-food-price">7,800원</div>
        </div>
        <div className="ordered-order-date">2021년 11월 24일 13시 21분</div>
        <div className="ordered-order-code">7293df7129k</div>
      </div>
    </div>
  );
}

export default OrderedFoodBox;
