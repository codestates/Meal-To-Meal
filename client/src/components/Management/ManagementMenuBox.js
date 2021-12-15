import React from 'react';

function ManagementMenuBox({ ownerStoreMenu }) {
  return (
    <>
      {ownerStoreMenu.map(el => (
        <div className="management-menu-container">
          <img className="management-menu-img" src={el.menu_image} alt="" />
          <div className="management-menu-info-container">
            <div className="management-menu-title-container">
              <div className="management-menu-name">{el.menu_name}</div>
              <div className="management-menu-price">{Number(el.menu_price).toLocaleString()}원</div>
            </div>
            <div className="management-menu-donation-container">
              <img className="management-menu-icon" src={require('../../img/donation.png').default} alt="" />
              <div className="management-menu-text">{el.menu_order_quantity}</div>
            </div>
            <div className="management-menu-code-container">
              <div className="management-menu-code-textList">
                {el.user_meals.length === 0 ? (
                  <div className="management-order-empty-text">아직 음식을 예약하신 손님이 없습니다</div>
                ) : (
                  <>
                    {el.user_meals.map(meals => (
                      <div className="management-menu-code-container">
                        <img className="management-menu-code-icon" src={require('../../img/code.png').default} alt="" />
                        <div className="management-menu-text"> 010-****-{meals.user.user_phone_number.slice(-4)}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ManagementMenuBox;
