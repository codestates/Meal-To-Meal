import React, { useState, useEffect } from 'react';

function ManagementMenuBox({ ownerStoreMenu }) {
  // ! 유저에는 오너아이디는 없음.
  // ! 그럼 가게 정보를 받아와서 주인 아이디가 있으면
  // ! 내가 받아온 accessToken의 유저 정보로 아이디가 맞으면
  // ! 진짜 자신이 가진 가게 페이지를 보여주고 맞지 않다면 바로 엠티 에니메이션을 보여준다.
  // console.log(ownerStoreMenu[0].user_meals[0].user.user_phone_number);

  return (
    <>
      {ownerStoreMenu.map(el => (
        <div className="management-menu-container">
          <img className="management-menu-img" src={el.menu_image} alt="" />
          <div className="management-menu-info-container">
            <div className="management-menu-title-container">
              <div className="management-menu-name">{el.menu_name}</div>
              <div className="management-menu-price">{el.menu_price}</div>
            </div>
            <div className="management-menu-donation-container">
              <img className="management-menu-icon" src={require('../../img/donation.png').default} alt="" />
              <div className="management-menu-text"> {el.menu_order_quantity}</div>
            </div>
            <div className="management-menu-code-container">
              <img className="management-menu-code-icon" src={require('../../img/code.png').default} alt="" />
              {el.user_meals.length === 0 ? (
                <div className="management-menu-text">아직 음식을 예약하신 손님이 없습니다</div>
              ) : (
                <>
                  {el.user_meals.map(meals => (
                    <div className="management-menu-text"> 010-****-{meals.user.user_phone_number.slice(-4)}</div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ManagementMenuBox;
