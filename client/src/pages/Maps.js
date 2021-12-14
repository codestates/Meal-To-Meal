import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../components/Map/Search';
import StoreInfoWindow from '../components/Map/StoreInfoWindow';
import SearchResultSidebar from '../components/Map/SearchResultSidebar';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import axios from 'axios';
import '../styles/pages/Maps.css';

// 마커 이미지
import 분식 from '../img/marker/분식.png';
import 베이커리 from '../img/marker/베이커리.png';
import 야식 from '../img/marker/야식.png';
import 양식 from '../img/marker/양식.png';
import 일식 from '../img/marker/일식.png';
import 중식 from '../img/marker/중식.png';
import 패스트푸드 from '../img/marker/패스트푸드.png';
import 한식 from '../img/marker/한식.png';

const Map = () => {
  const navigate = useNavigate();
  const [icon, setIcon] = useState('');
  const [storeList, setStoreList] = useState([]);
  const [selected, setSelected] = useState(null);

  const getImage = e => {
    if (e === '분식') return 분식;
    if (e === '빵') return 베이커리;
    if (e === '야식') return 야식;
    if (e === '양식') return 양식;
    if (e === '일식') return 일식;
    if (e === '중식') return 중식;
    if (e === '패스트푸드') return 패스트푸드;
    if (e === '한식') return 한식;
  };

  const storeListHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/store-list`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(res => {
        setStoreList(res.data.storeList);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    storeListHandler();
  }, []);

  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 37.51249519205713, lng: 126.99480974427608 }}
      options={{ disableDefaultUI: true }}
    >
      {storeList.map(el => (
        <Marker
          key={el.id}
          position={{
            lat: Number(el.store_lat),
            lng: Number(el.store_lng),
          }}
          icon={{ url: getImage(el.store_category) }}
          onClick={() => {
            setSelected(el);
            localStorage.setItem('clickedMarker', el.id);
          }}
        >
          {selected && selected.id === el.id && (
            <InfoWindow
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <StoreInfoWindow storeData={el} navigate={navigate} />
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

const GoogleMaps = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
        libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
};
const Maps = () => {
  const [isOpenSearchResultSidebar, setIsOpenSearchResultSidebar] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div className="map-container">
      <GoogleMaps />
      <Search
        isOpenSearchResultSidebar={isOpenSearchResultSidebar}
        setIsOpenSearchResultSidebar={setIsOpenSearchResultSidebar}
        setSearchResult={setSearchResult}
      />
      {isOpenSearchResultSidebar ? <SearchResultSidebar searchResult={searchResult} /> : null}
    </div>
  );
};

export default Maps;
