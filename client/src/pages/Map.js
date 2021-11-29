// eslint-disable-next-line no-unused-vars
/* global kakao */
import React, { useEffect } from 'react';

import '../styles/pages/Map.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Search from '../components/Search';
import MapStoreinfo from '../components/MapStoreinfo';
import Markerdata from '../static/kakao_markerdata';

import '../styles/pages/Map.css';

const { kakao } = window;

const Map = ({ isLogin, setIsLogin }) => {
  useEffect(() => {
    let container = document.getElementById('map');

    let options = {
      center: new window.kakao.maps.LatLng(37.512186, 126.996333),
      level: 7,
    };
    let map = new window.kakao.maps.Map(container, options);
    Markerdata.forEach(el => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.store_lat, el.store_lng),
      });
    });
  });

  return (
    <div className="kakaomap-pagecontainer">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <div className="kakaomap-container" id="map" />
      <Search />
      <MapStoreinfo />
      <Footer />
    </div>
  );
};

export default Map;
