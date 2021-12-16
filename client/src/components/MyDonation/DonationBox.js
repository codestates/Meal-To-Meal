import React from 'react';

function DonationBox({ donationList }) {
  return (
    <>
      {donationList.map(item => (
        <div className="donationbox-container">
          <div className="donationbox-title-container">
            <div className="donationbox-date-content">
              <img className="donationbox-createdat-icon" src={require('../../img/time.png').default} alt="" />
              <div className="donationbox-createdat-text">{item.cart_menus[0].menu.createdAt.slice(0, 10)}</div>
            </div>
          </div>
          <div className="donationbox-content-container">
            {item.cart_menus.map(el => (
              <div className="donationbox-food-info-container">
                <div className="donationbox-store-name-container">
                  <img
                    className="donationbox-store-category"
                    src={require(`../../img/marker/${el.menu.store.store_category}.png`).default}
                    alt=""
                  ></img>
                  <div className="donationbox-store-name">{el.menu.store.store_name}</div>
                </div>
                <div className="donationbox-food-name">
                  <div>&#x1F37D; {el.menu.menu_name}</div>
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
