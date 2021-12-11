import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManagementMenuBox() {
  const [isOwner, setIsOwner] = useState(false);

  // ! 유저에는 오너아이디는 없음.
  // ! 그럼 가게 정보를 받아와서 주인 아이디가 있으면
  // ! 내가 받아온 accessToken의 유저 정보로 아이디가 맞으면
  // ! 진짜 자신이 가진 가게 페이지를 보여주고 맞지 않다면 바로 엠티 에니메이션을 보여준다.

  // const isStoreOwner = () => {
  //   const accessToken = localStorage.getItem('accessToken');
  //   if (!accessToken) {
  //     return;
  //   } else {
  //     axios
  //       .get(`${process.env.REACT_APP_API_URL}/store/${localStorage.getItem('accessToken')}`, {
  //         headers: { authorization: `Bearer ${accessToken}` },
  //         withCredentials: true,
  //       })
  //       .then(res => {
  //         console.log(res.data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }
  // };

  // useEffect(() => {
  //   isStoreOwner();
  // }, []);

  return (
    <>
      <div className="management-menu-container">
        <img className="management-menu-img" src={require('../../img/dummy/store5.png').default} alt="" />
        <div className="management-menu-info-container">
          <div className="management-menu-title-container">
            <div className="management-menu-name">원조 옛날통닭</div>
            <div className="management-menu-price">6.800원</div>
          </div>
          <div className="management-menu-donation-container">
            <img className="management-menu-icon" src={require('../../img/donation.png').default} alt="" />
            <div className="management-menu-text">: 3</div>
          </div>
          <div className="management-menu-code-container">
            <img className="management-menu-code-icon" src={require('../../img/code.png').default} alt="" />
            <div className="management-menu-text">: 1309478</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagementMenuBox;
