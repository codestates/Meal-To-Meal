import React from 'react';
import axios from 'axios';

function DonationBox({ donationList }) {
  console.log(donationList);
  return (
    <>
      {donationList.map(item => (
        <div className="donationbox-container">
          <div className="donationbox-title-container">
            <img className="donationbox-category-icon" src={require('../../img/찌개.png').default} alt="" />
            <div className="donationbox-store-name">{item.cart_menus[0].menu.store.store_name}</div>
            <img className="donationbox-createdat-icon" src={item.cart_menus[0].menu.menu_image} alt="" />
            <div className="donationbox-createdat-text">{item.cart_menus[0].menu.createdAt.slice(0, 10)}</div>
          </div>
          <div className="donationbox-address-container">
            <img className="donationbox-address-icon" src={require('../../img/marker.png').default} alt="" />
            <div className="donationbox-address-text">{item.cart_menus[0].menu.store.store_address}</div>
          </div>
          <div className="donationbox-content-container">
            <img
              className="donationbox-food-image"
              src={require('../../img/dummy/menu_dummy/스프링롤.jpg').default}
              alt=""
            />
            {item.cart_menus.map(el => (
              <div className="donationbox-food-info-container">
                <div className="donationbox-food-name">
                  <div>{el.menu.menu_name}</div>
                </div>
                <div className="donationbox-food-price">{Number(el.menu.menu_price).toLocaleString()}원</div>
                <div className="donationbox-dish-count-container">
                  <img className="donationbox-dish-icon" src={require('../../img/donation.png').default} alt="" />
                  <div className="donationbox-dish-number"> : {el.order_quantity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default DonationBox;
