import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../components/Map/Search';
import StoreInfoWindow from '../components/Map/StoreInfoWindow';
import SearchResultSidebar from '../components/Map/SearchResultSidebar';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import axios from 'axios';
import '../styles/pages/Maps.css';

const Map = () => {
  const navigate = useNavigate();

  const [storeList, setStoreList] = useState([]);
  const [selected, setSelected] = useState(null);

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
    console.log(storeList);
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
