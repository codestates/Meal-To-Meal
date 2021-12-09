import React from 'react';

function UserMealBox({ orderedMeal }) {
  return (
    <div className="ordered-food-container">
      <img className="ordered-food-image" src={orderedMeal.menu_image} alt="" />
      <div className="ordered-food-info-container">
        <div className="ordered-food-info-title-container">
          <div className="ordered-food-name">{orderedMeal.menu_name}</div>
          <div className="ordered-food-name">{orderedMeal.menu_price}</div>
        </div>
        <div className="ordered-food-name">2022년 1월 1일</div>
        <div className="ordered-order-code">7293df7129k</div>
      </div>
    </div>
  );
}

export default UserMealBox;
