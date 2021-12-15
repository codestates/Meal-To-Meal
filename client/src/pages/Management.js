import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManagementMenuBox from '../components/Management/ManagementMenuBox';
import ManagementMptyAni from '../components/Management/ManagementMptyAni';
import '../styles/pages/Management.css';

function Management({ navigate, getImage }) {
  const accessToken = localStorage.getItem('accessToken');
  const [icon, setIcon] = useState('');
  const [ownerStoreInfo, setOwnerStoreInfo] = useState([]);
  const [ownerStoreMenu, setOwnerStoreMenu] = useState([]);

  const isStoreOwner = () => {
    if (!accessToken) {
      return;
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/store-list/management`, {
          headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .then(res => {
          setOwnerStoreInfo(res.data.storeInfo);
          console.log(res.data);
          setIcon(getImage(res.data.storeInfo.store_category));
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const getOwnerStoreMenuHandler = () => {
    if (!accessToken) {
      return;
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/menu-list/management`, {
          headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .then(res => {
          setOwnerStoreMenu(res.data.menuList);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    isStoreOwner();
    getOwnerStoreMenuHandler();
  }, [icon]);

  return (
    <>
      {!ownerStoreInfo || ownerStoreInfo.length === 0 ? (
        <ManagementMptyAni navigate={navigate} />
      ) : (
        <div className="Management-page">
          <div className="management-container">
            <div className="management-store-info-container">
              <div className="management-title">나의 가게 정보</div>
              <div className="management-store-title-container">
                <img className="management-store-category-icon" src={icon} alt="" />
                <div className="management-store-title">{ownerStoreInfo.store_name}</div>
                <div className="management-store-category">{ownerStoreInfo.store_category}</div>
              </div>
              <img className="management-store-img" src={ownerStoreInfo.store_image} alt="" />
              <div className="management-store-detail-info-container">
                <div className="management-detail-info">
                  <img className="management-detail-icon" src={require('../img/marker.png').default} alt=""></img>
                  <div className="management-detail-text">{ownerStoreInfo.store_address}</div>
                </div>
                <div className="management-detail-info">
                  <img className="management-detail-icon" src={require('../img/desciption.png').default} alt=""></img>
                  <div className="management-detail-text">{ownerStoreInfo.store_description}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="management-store-menu-container">
            <div className="management-title">메뉴</div>
            <ManagementMenuBox ownerStoreMenu={ownerStoreMenu} />
            <div className="management-button-container">
              <button className="management-button">수정</button>
              <button className="management-delete-button">삭제</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Management;
