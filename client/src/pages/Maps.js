import React, { useState, useEffect } from 'react';
import Search from '../components/Map/Search';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';
import axios from 'axios';
import '../styles/pages/Maps.css';

const Map = () => {
  const [target, setTarget] = useState({ lat: null, lng: null });
  const [storeList, setStoreList] = useState([]);

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
          onClick={() => localStorage.setItem('clickedMarker', el.id)}
        />
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
  return (
    <div className="map-container">
      <GoogleMaps />
      <Search />
    </div>
  );
};

export default Maps;
