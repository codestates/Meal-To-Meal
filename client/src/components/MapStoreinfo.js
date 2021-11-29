import React from 'react';

function MapStoreinfo({ selected }) {
  return (
    <div className="storeinfo-container">
      <img className="storeinfo-storeimage" src={selected.store_image.props.src} alt="" />
      <div className="storeinfo-box">
        <div className="storeinfo-boxcontainer">
          <div className="storeinfo-storename">{selected.store_name}</div>
          <div className="storeinfo-storecategory">{selected.store_category}</div>
          <img className="storeinfo-icon" src={require('../img/donation.png').default} alt="" />
          <div className="storeinfo-storedonation">: 7</div>
        </div>
        <div className="storeinfo-boxcontainer">
          <img className="storeinfo-icon" src={require('../img/location.png').default} alt="" />
          <div className="storeinfo-storeaddress">{selected.store_address}</div>
          <img className="storeinfo-icon" src={require('../img/businesshour.png').default} alt="" />
          <div className="storeinfo-business_hour">{selected.business_hours}</div>
        </div>
        <div className="storeinfo-boxcontainer">
          <img className="storeinfo-icon" src={require('../img/desciption.png').default} alt="" />
          <div className="storeinfo-storedescription">{selected.store_description}</div>
        </div>
      </div>
    </div>
  );
}

export default MapStoreinfo;
