import React, { useState, useEffect } from 'react';

function Infowindow({ storeList }) {
  const clickedStoreId = localStorage.getItem('clickedMarker');

  const [store, setStore] = useState(storeList.filter(el => el.id === clickedStoreId));

  console.log(storeList);

  return (
    <>
      {storeList.length === 0 ? (
        <div>엄서요</div>
      ) : (
        <>
          {store.map(el => (
            <div className="infowindow-window">
              <div className="infowindow-store-container">
                <img className="infowindow-store-img" src={require('../../img/dummy/store1.png').default} alt="" />
                <div className="infowindow-store-info-container">
                  <div className="infowindow-store-info-title-container">
                    <div className="infowindow-store-name">{el.store_name}</div>
                    <div className="infowindow-store-category">애ㅑ햐아</div>
                  </div>
                  <div className="infowindow-detail-container">
                    <div className="infowindow-store-detail-container">
                      <div className="infowindow-store-detail-info-container">
                        <i className="fas fa-map-marker-alt" />
                        <div className="infowindow-store-detail-text">허리도 가늘군 만지면 부러지리</div>
                      </div>
                      <div className="infowindow-store-detail-info-container">
                        <i className="fas fa-utensils" />
                        <div className="infowindow-store-detail-text">110년 내공을 담았다!</div>
                      </div>
                    </div>
                    <div className="infowindow-store-detail-container">
                      <div className="infowindow-store-detail-info-container">
                        <i className="fas fa-heart" />
                        <div className="infowindow-store-detail-text">: 3</div>
                      </div>
                      <div className="infowindow-store-detail-info-container">
                        <i className="fas fa-business-time" />
                        <div className="infowindow-store-detail-text">: 10:00 ~ 23:00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Infowindow;
