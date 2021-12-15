import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import AddMenu from '../components/Management/AddMenu';

import '../styles/pages/AddStore.css';

function FixStore({ navigate, getImage }) {
  const accessToken = localStorage.getItem('accessToken');
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('우편번호');
  const [addressDetail, setAddressDetail] = useState('주소');
  const [fullAddress, setFullAddress] = useState('');
  // fullAddress 가 진짜 다 합쳐진 주소지롱
  const [store, setStore] = useState();
  // 이 store는 내가 등록한 모든 가게의 정보가 다 담겨 있스
  const [menuCount, setMenuCount] = useState([<AddMenu />]);
  const [menuInfo, setMenuInfo] = useState([{ menu_name: '', menu_price: '' }]);
  const [oneMenu, setOneMenu] = useState([]);
  const [icon, setIcon] = useState('');
  const [ownerStoreInfo, setOwnerStoreInfo] = useState([]);
  const [ownerStoreMenu, setOwnerStoreMenu] = useState([]);

  const [isOpenSearchAddress, setIsOpenSearchAddress] = useState(false);

  const searchAddressHandler = () => {
    setIsOpenSearchAddress(!isOpenSearchAddress);
  };

  const onHandleChange = e => {
    setStoreName(`${addressDetail} ${e.target.value}`);
    setFullAddress(`${addressDetail} ${e.target.value}`);
  };

  const addMenuHandler = el => {
    // addMenuHandler([...menuInfo, { menu_price: e.target.value }]);
    setMenuInfo(el);
    console.log(el);
  };

  const onCompletePost = data => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    setIsOpenSearchAddress(false);
  };

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
          console.log(res.data.storeInfo);
          setIcon(getImage(res.data.storeInfo.store_category));
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const getOwnerStoreDetailHandler = () => {
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
          console.log(res.data.menuList);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    isStoreOwner();
    getOwnerStoreDetailHandler();
  }, []);

  return (
    <>
      <div className="AddStore-container">
        <div className="AddStore-store-title-container">
          <div className="AddStore-title">가게 정보 등록</div>
          <img className="AddStore-store-img" src={require('../img/dummy/store1.png').default} alt="" />
          <input type="file" className="AddStore-store-img-add-input" />
          <div className="AddStore-store-text">상호명</div>
          <input
            className="AddStore-store-info-input"
            placeholder="가게 이름을 입력하세요."
            onChange={e => onHandleChange(e)}
            value={ownerStoreInfo.store_name}
          />
          <div className="AddStore-store-text">카테고리</div>
          <input className="AddStore-store-info-input" placeholder="카테고리를 선택하세요." />
          <div className="AddStore-store-text">가게 설명</div>
          <textarea className="AddStore-store-description-input" placeholder="가게 설명을 적어 주세요." />
        </div>
        <div className="AddStore-store-title-container">
          <div className="AddStore-store-text">영업시간</div>
          <input className="AddStore-store-info-input" placeholder="영업시간을 적어 주세요." />
          <div className="AddStore-store-text">가게주소</div>
          <button className="AddStore-address-button" onClick={() => searchAddressHandler()}>
            가게 주소 등록하기
          </button>
          {isOpenSearchAddress ? (
            <div className="daum-postcode-backdrop">
              <div className="daum-postcode-window">
                <DaumPostcode autoClose onComplete={onCompletePost} />
              </div>
              <button className="daum-postcode-close" onClick={searchAddressHandler}>
                닫기
              </button>
            </div>
          ) : null}
          <div className="AddStore-store-address">{address}</div>
          <div className="AddStore-store-address">{addressDetail}</div>
          <input className="AddStore-store-info-input" placeholder="상세주소" onChange={e => onHandleChange(e)} />
          <div className="AddStore-title">메뉴 등록</div>
          <div className="AddStore-add-menu-container">
            {menuCount.map(el => (
              <AddMenu addMenuHandler={addMenuHandler} menuInfo={menuInfo} />
            ))}
          </div>
          <button className="AddStore-add-menu-button" onClick={() => setMenuCount([...menuCount, <AddMenu />])}>
            + 메뉴 추가
          </button>
          <div className="AddStore-add-menu-button-container">
            <button className="AddStore-button">저장</button>
            <button className="AddStore-button">취소</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FixStore;
