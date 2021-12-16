import React from 'react';

function StoreInfoWindow({ storeData, navigate }) {
  return (
    <div className="infowindow-window">
      <img
        className="infowindow-store-img"
        src={`${storeData.store_image}`}
        alt=""
        onClick={() => navigate(`/store/${storeData.id}`)}
      />
      <div className="infowindow-info-container">
        <div className="infowindow-store-title-container" onClick={() => navigate(`/store/${storeData.id}`)}>
          <img
            className="infowindow-store-category-icon"
            src={require(`../../img/category/${storeData.store_category}.png`).default}
            alt=""
          />
          <div className="infowindow-store-title-text">{storeData.store_name}</div>
          <div className="infowindow-store-category">{storeData.store_category}</div>
        </div>
        <div className="infowindow-store-info-container">
          <div className="infowindow-store-info-container-02">
            <img className="infowindow-info-icon" src={require('../../img/marker.png').default} alt="" />
            <div className="infowindow-info-text">{storeData.store_address.slice(0, 12)}...</div>
          </div>
          <div className="infowindow-store-info-container-02">
            <img className="infowindow-info-icon" src={require('../../img/love.png').default} alt="" />
            <div className="infowindow-info-text">{storeData.store_order_quantity}</div>
          </div>
        </div>
        <div className="infowindow-store-info-container">
          <div className="infowindow-store-info-container-02">
            <img className="infowindow-info-icon" src={require('../../img/book.png').default} alt="" />
            <div className="infowindow-info-text">{storeData.store_description.slice(0, 15)}...</div>
          </div>
          <div className="infowindow-store-info-container-02">
            <img className="infowindow-info-icon" src={require('../../img/time.png').default} alt="" />
            <div className="infowindow-info-text">{storeData.business_hour}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreInfoWindow;
