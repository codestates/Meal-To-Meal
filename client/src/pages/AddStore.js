import React, { useState, useRef, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import S3FileUpload from 'react-s3';
import { v4 as uuid } from 'uuid';
import AddMenu from '../components/Management/AddMenu';
import AddedMenu from '../components/Management/AddedMenu';
import Loading from '../components/Loading';
import '../styles/pages/AddStore.css';

function AddStore({ navigate, openWarningAlertHandler, setAlertMessage, openAlertHandler }) {
  const accessToken = localStorage.getItem('accessToken');
  const [address, setAddress] = useState('우편번호');
  const [addressDetail, setAddressDetail] = useState('주소');
  const [fullAddress, setFullAddress] = useState('');
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [menuList, setMenuList] = useState([]);
  const [menuInfo, setMenuInfo] = useState({ menu_name: '', menu_price: '' });
  const [isOpenSearchAddress, setIsOpenSearchAddress] = useState(false);
  const [storeUrl, setStoreUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [menuUrl, setMenuUrl] = useState([{ addMenuUrl: 'https://meal2sdk.s3.amazonaws.com/-001_12.jpg' }]);
  const [newStoreInfo, setNewStoreInfo] = useState({
    store_image: '',
    store_name: '',
    store_category: '',
    store_description: '',
    business_hour: '',
    store_address: '',
    store_lat: '',
    store_lng: '',
    menuInfo: '',
  });

  const searchAddressHandler = () => {
    setIsOpenSearchAddress(!isOpenSearchAddress);
  };

  const onHandleChange = e => {
    setFullAddress(`${addressDetail} ${e.target.value}`);
  };

  const imgRef = useRef();
  const addMenuImgRef = useRef();
  const addedMenuImgRef = useRef();

  const config = {
    bucketName: 'meal2sdk',
    region: 'ap-northeast-2',
    accessKeyId: `${process.env.REACT_APP_SDK_ACCESSKEY_ID}`,
    secretAccessKey: `${process.env.REACT_APP_SDK_SECRETACCESS_KEY}`,
  };

  const uploadImage = e => key => {
    if (!e.target.files[0]) return;
    e.target.files[0].newName = `${uuid()}.${e.target.files[0].type.split('/')[1]}`;
    S3FileUpload.uploadFile(e.target.files[0], config)
      .then(data => {
        if (key === 'add_menu_image') {
          setMenuUrl([{ addMenuUrl: data.location }]);
          handleStoreInputValue('menu_image')(e);
        } else {
          setStoreUrl(data.location);
          handleStoreInputValue('store_image')(e);
        }
        setNewStoreInfo({ ...newStoreInfo, [key]: data.location });
      })
      .catch(err => {
        console.log(err);
        setAlertMessage('사진용량이 너무 큽니다!');
        openWarningAlertHandler();
      });
  };

  const handleStoreInputValue = key => e => {
    // 가게 등록 정보 입력
    setNewStoreInfo({ ...newStoreInfo, [key]: e.target.value });
  };

  const handleInputValue = key => e => {
    setMenuInfo({ ...menuInfo, [key]: e.target.value.toLowerCase() });
  };

  const addMenuHandler = () => {
    setMenuList([
      ...menuList,
      { menu_name: menuInfo.menu_name, menu_price: menuInfo.menu_price, menu_image: menuUrl[0].addMenuUrl },
    ]);
    setMenuUrl([{ addMenuUrl: '' }]);
  };

  const getLocationHandler = () => {
    if (fullAddress === '') return;
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&language=ko&key=${process.env.REACT_APP_GEOCODING_KEY}`,
        { withCredentials: false }
      )
      .then(res => {
        setLocation({ lat: res.data.results[0].geometry.location.lat, lng: res.data.results[0].geometry.location.lng });
      })
      .catch(err => {
        setAlertMessage('주소를 검색 한 후에 저장해 주세요!');
        openWarningAlertHandler();
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
    getLocationHandler();
  }, [fullAddress]);

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

  const newStoreRegisterHandler = () => {
    const { store_image, store_name, store_category, store_description, business_hour } = newStoreInfo;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/store`,
        {
          store_image,
          store_name,
          store_category,
          store_description,
          business_hour,
          store_address: fullAddress,
          store_lat: location.lat,
          store_lng: location.lng,
          menuInfo: menuList,
        },
        {
          headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then(res => {
        setAlertMessage('가게가 등록되었습니다');
        openAlertHandler();
        navigate('/management');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="AddStore-container">
          <div className="AddStore-store-title-container">
            <div className="AddStore-title">가게 정보 등록</div>
            <img
              className="AddStore-store-img"
              src={storeUrl}
              ref={imgRef}
              alt=""
              onError={() => {
                return (imgRef.current.src = 'https://meal2sdk.s3.amazonaws.com/-001_12.jpg');
              }}
            />
            <input
              type="file"
              className="AddStore-store-img-add-input"
              accept="image/*"
              onChange={e => {
                uploadImage(e)('store_image');
              }}
            />
            <div className="AddStore-store-text">상호명</div>
            <input
              className="AddStore-store-info-input"
              placeholder="가게 이름을 입력하세요."
              onChange={handleStoreInputValue('store_name')}
            />
            <div className="AddStore-store-text">카테고리</div>
            <select className="AddStore-store-info-input" onChange={handleStoreInputValue('store_category')}>
              <option value="카테고리 선택">카테고리 선택</option>
              <option value="베이커리">베이커리</option>
              <option value="분식">분식</option>
              <option value="야식">야식</option>
              <option value="양식">양식</option>
              <option value="일식">일식</option>
              <option value="중식">중식</option>
              <option value="패스트푸드">패스트푸드</option>
              <option value="한식">한식</option>
            </select>
            <div className="AddStore-store-text">가게 설명</div>
            <textarea
              className="AddStore-store-description-input"
              placeholder="가게 설명을 적어 주세요."
              onChange={handleStoreInputValue('store_description')}
            />
          </div>
          <div className="AddStore-store-title-container">
            <div className="AddStore-store-text">영업시간</div>
            <input
              className="AddStore-store-info-input"
              placeholder="영업시간을 적어 주세요."
              onChange={handleStoreInputValue('business_hour')}
            />
            <div className="AddStore-store-text">가게주소</div>
            <button className="AddStore-address-button" onClick={() => searchAddressHandler()}>
              가게 주소 등록하기
            </button>
            {isOpenSearchAddress ? (
              <div className="daum-postcode-backdrop">
                <div className="daum-postcode-window">
                  <DaumPostcode autoClose onComplete={onCompletePost} />
                  <button className="daum-postcode-close" onClick={searchAddressHandler}>
                    닫기
                  </button>
                </div>
              </div>
            ) : null}
            <div className="AddStore-store-address">{address}</div>
            <div className="AddStore-store-address">{addressDetail}</div>
            <input className="AddStore-store-info-input" placeholder="상세주소" onChange={e => onHandleChange(e)} />
            <div className="AddStore-title">메뉴 등록</div>
            {menuList.length !== 0
              ? menuList.map(item => (
                  <div className="AddStore-add-menu-container">
                    <AddedMenu key={item.id} addedMenuImgRef={addedMenuImgRef} item={item} img={item.menu_image} />
                  </div>
                ))
              : null}
            <div className="AddStore-add-menu-container">
              <AddMenu
                menuUrl={menuUrl}
                addMenuImgRef={addMenuImgRef}
                uploadImage={uploadImage}
                handleInputValue={handleInputValue}
              />
            </div>
            <button className="AddStore-add-menu-button" onClick={() => addMenuHandler()}>
              + 저장 후 다음 메뉴 추가
            </button>
            <div className="AddStore-add-menu-button-container">
              <button className="AddStore-button" onClick={newStoreRegisterHandler}>
                저장
              </button>
              <button className="AddStore-button">취소</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddStore;
