import React from 'react';

function MapStoreinfo() {
  return (
    <div className="storeinfo-container">
      <img className="storeinfo-storeimage" src={require('../img/dummy/store1.png').default} />
      <div className="storeinfo-box">
        <div className="storeinfo-boxcontainer">
          <div className="storeinfo-storename">엔그릴</div>
          <div className="storeinfo-storecategory">한식</div>
          <img className="storeinfo-icon" src={require('../img/donation.png').default} alt="" />
          <div className="storeinfo-storedonation">: 7</div>
        </div>
        <div className="storeinfo-boxcontainer">
          <img className="storeinfo-icon" src={require('../img/location.png').default} alt="" />
          <div className="storeinfo-storeaddress">서울특별시 용산구 용산2가동 남산공원길 105 7층</div>
          <img className="storeinfo-icon" src={require('../img/businesshour.png').default} alt="" />
          <div className="storeinfo-business_hour">'11:00 ~ 23:00</div>
        </div>
        <div className="storeinfo-boxcontainer">
          <img className="storeinfo-icon" src={require('../img/desciption.png').default} alt="" />
          <div className="storeinfo-storedescription">프랑스 음식점</div>
        </div>
      </div>
    </div>
  );
}

export default MapStoreinfo;
