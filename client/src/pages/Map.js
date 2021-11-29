// eslint-disable-next-line no-unused-vars
/* global kakao */
import { get } from 'fast-levenshtein';
import React, { useState, useEffect } from 'react';

import '../styles/pages/Map.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Search from '../components/Search';

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
      const infowindow = new kakao.maps.InfoWindow({
        content: el.store_name,
      });
      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(
          '<div style="width: 400px; height: 100px; padding: 5px; font-size: 15px; ">' + el.store_name + '</div>'
        );
        infowindow.open(map, marker);
      });
      kakao.maps.event.addListener(map, 'click', function () {
        infowindow.close();
      });
    });
  });

  return (
    <div className="kakaomap-pagecontainer">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <div className="kakaomap-container" id="map" />
      <Search />
      <Footer />
    </div>
  );
};

export default Map;
