import React from 'react';

function UserMealBox({ orderedMeal }) {
  return (
    <div className="ordered-food-container">
      <img className="ordered-food-image" src={orderedMeal[0].menu.menu_image} alt="" />
      <div className="ordered-food-info-container">
        <div className="ordered-food-info-title-container">
          <div className="ordered-food-name">{orderedMeal[0].menu.menu_name}</div>
          <div className="ordered-food-name">{orderedMeal[0].menu.menu_price}</div>
        </div>
        <div className="ordered-food-name">{orderedMeal[0].updatedAt.slice(0, 10)}</div>
        <div className="ordered-order-code">{orderedMeal[0].donation_code}</div>
      </div>
    </div>
  );
}

export default UserMealBox;
