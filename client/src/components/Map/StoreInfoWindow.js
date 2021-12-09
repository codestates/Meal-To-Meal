import React from 'react';

function StoreInfoWindow({ storeData, navigate }) {
  return (
    <div className="infowindow-window">
      <img
        className="infowindow-store-img"
        src={require('../../img/dummy/store1.png').default}
        alt=""
        onClick={() => navigate(`/store/${storeData.id}`)}
      />
      <div className="infowindow-info-container">
        <div className="infowindow-store-title-container" onClick={() => navigate(`/store/${storeData.id}`)}>
          <div className="infowindow-store-title-text">{storeData.store_name}</div>
          <div className="infowindow-store-category">{storeData.store_category}</div>
        </div>
        <div className="infowindow-store-info-container">
          <div className="infowindow-store-info-container-02">
            <i className="infowindow-info-icon fa fa-map-marker-alt" />
            <div className="infowindow-info-text">{storeData.store_address.slice(0, 12)}...</div>
          </div>
          <div className="infowindow-store-info-container-02">
            <i className="infowindow-info-icon fa fa-heart" />
            <div className="infowindow-info-text">{storeData.store_order_quantity}</div>
          </div>
        </div>
        <div className="infowindow-store-info-container">
          <div className="infowindow-store-info-container-02">
            <i className="infowindow-info-icon fa fa-utensils" />
            <div className="infowindow-info-text">{storeData.store_description.slice(0, 15)}...</div>
          </div>
          <div className="infowindow-store-info-container-02">
            <i className="infowindow-info-icon fa fa-business-time" />
            <div className="infowindow-info-text">{storeData.business_hour}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreInfoWindow;
