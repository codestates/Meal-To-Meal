import React, { useState, useEffect, useRef } from 'react';
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
  const [storeList, setStoreList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isOpenSearchResultSidebar, setIsOpenSearchResultSidebar] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isChangeCenter, setIsChangeCenter] = useState({ lat: 37.51249519205713, lng: 126.99480974427608, zoom: 13 });

  const getImage = e => {
    if (e === '분식') return 분식;
    if (e === '베이커리') return 베이커리;
    if (e === '야식') return 야식;
    if (e === '양식') return 양식;
    if (e === '일식') return 일식;
    if (e === '중식') return 중식;
    if (e === '패스트푸드') return 패스트푸드;
    if (e === '한식') return 한식;
    else return 한식;
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

  const marker = useRef();

  return (
    <GoogleMap
      center={{ lat: Number(isChangeCenter.lat), lng: Number(isChangeCenter.lng) }}
      zoom={isChangeCenter.zoom}
      options={{ disableDefaultUI: true, minZoom: 9, maxZoom: 18 }}
    >
      {storeList.map(el => (
        <Marker
          onMouseOver={e => {
            e.domEvent.target.src =
              'https://meal2sdk.s3.ap-northeast-2.amazonaws.com/d8d383b9-47ea-4a57-9eb8-fab499b28f34.png';
          }}
          onMouseOut={e => {
            e.domEvent.target.src = 'https://maps.gstatic.com/mapfiles/transparent.png';
          }}
          key={el.id}
          className="clicked"
          position={{
            lat: Number(el.store_lat),
            lng: Number(el.store_lng),
          }}
          icon={{ url: getImage(el.store_category) }}
          onClick={() => {
            setIsChangeCenter({ lat: Number(el.store_lat), lng: Number(el.store_lng) });
            setSelected(el);
            localStorage.setItem('clickedMarker', el.id);
          }}
          ref={marker}
        >
          {selected && selected.id === el.id && (
            <InfoWindow onCloseClick={() => setSelected(null)}>
              <StoreInfoWindow storeData={el} navigate={navigate} />
            </InfoWindow>
          )}
        </Marker>
      ))}
      <Search
        isOpenSearchResultSidebar={isOpenSearchResultSidebar}
        setIsOpenSearchResultSidebar={setIsOpenSearchResultSidebar}
        setSearchResult={setSearchResult}
      />
      {isOpenSearchResultSidebar ? (
        <SearchResultSidebar
          searchResult={searchResult}
          setIsChangeCenter={setIsChangeCenter}
          setSelected={setSelected}
        />
      ) : null}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

const Maps = () => {
  return (
    <div className="map-container">
      <div style={{ width: '100vw', height: '100vh' }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
        libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    </div>
  );
};

export default Maps;
