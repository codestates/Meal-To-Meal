/* global kakao */
import React, { useState, useEffect } from 'react';
import '../styles/pages/Map.css';
import { get } from 'fast-levenshtein';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Markerdata from '../static/kakao_markerdata';

const { kakao } = window;

const Map = ({ isLogin, setIsLogin, openLoginModalHandler }) => {
  const [isLogin, setIsLogin] = useState(false);

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

      const customOverlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(el.store_lat, el.store_lng),
        content: `<div class ="label"><span class="left"></span><span class="center">${el.store_name}</span><span class="right"></span></div>`,
      });
      kakao.maps.event.addListener(marker, 'click', function () {
        customOverlay.setMap(map);
      });
      // kakao.maps.event.addListener(map, 'click', function () {
      //   infowindow.close();
      // });
    });
  });
  return (
    <div className="kakaomap-pagecontainer">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} openLoginModalHandler={openLoginModalHandler} />
      <div className="kakaomap-container" id="map" />
      <Search />
      <Footer />
    </div>
  );
};

export default Map;
