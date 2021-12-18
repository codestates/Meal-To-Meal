import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManagementMenuBox from '../components/Management/ManagementMenuBox';
import ManagementMptyAni from '../components/Management/ManagementMptyAni';
import '../styles/pages/Management.css';

function Management({ navigate, getImage, setAlertMessage, openAlertHandler, openWarningAlertHandler }) {
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
          if (res.data.message === '권한이 없습니다') {
            return;
          } else {
            setOwnerStoreInfo(res.data.storeInfo);
            setIcon(getImage(res.data.storeInfo.store_category));
            getOwnerStoreMenuHandler();
          }
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

  const deleteStoreHandler = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/store/${ownerStoreInfo.id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}`, 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(res => {
        setAlertMessage('가게 삭제가 완료되었습니다. 사람들에게 맛있는 음식을 제공해주셔서 감사합니다!');
        openAlertHandler();
        navigate('/');
      })
      .catch(err => {
        setAlertMessage('잘못된 요청입니다');
        openWarningAlertHandler();
        console.log(err);
      });
  };

  useEffect(() => {
    isStoreOwner();
  }, [icon]);

  return (
    <>
      {!ownerStoreInfo || ownerStoreInfo.length === 0 ? (
        <ManagementMptyAni navigate={navigate} />
      ) : (
        <div className="management-page">
          <div className="management-container">
            <div className="management-title">나의 가게 정보</div>
            <div className="management-store-info-container">
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
              <button className="management-button" onClick={() => navigate('/fixstore')}>
                수정
              </button>
              <button className="management-delete-button" onClick={deleteStoreHandler}>
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Management;
