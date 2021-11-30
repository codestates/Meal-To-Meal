// eslint-disable-next-line no-unused-vars
/* global kakao */
import React, { useEffect } from 'react';

import '../styles/pages/Map.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Search from '../components/Search';

import Markerdata from '../static/kakao_markerdata';

import '../styles/pages/Map.css';

const { kakao } = window;

const Map = ({ isLogin, setIsLogin, openLoginModalHandler }) => {
  useEffect(() => {
    const container = document.getElementById('map');

    const options = {
      center: new kakao.maps.LatLng(37.512186, 126.996333),
      level: 7,
    };

    const map = new kakao.maps.Map(container, options);

    // eslint-disable-next-line no-lone-blocks
    {
      Markerdata.forEach(el => {
        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(el.store_lat, el.store_lng),
          clickable: true,
        });

        var content = document.createElement('div');
        content.classList.add('customOverlay-container');
        content.style.position = 'absolute';

        var info = document.createElement('div');
        info.classList.add('customOverlay-title');
        info.appendChild(document.createTextNode(el.store_name));
        content.appendChild(info);

        var closeBtn = document.createElement('button');
        closeBtn.appendChild(document.createTextNode('닫기'));
        closeBtn.classList.add('customOverlay-close-button');
        closeBtn.onclick = function () {
          customOverlay.setMap(null);
        };
        content.appendChild(closeBtn);

        const customOverlay = new kakao.maps.CustomOverlay({
          content: content,
          position: new kakao.maps.LatLng(el.store_lat, el.store_lng),
        });
        kakao.maps.event.addListener(marker, 'click', function () {
          map.setCenter(new kakao.maps.LatLng(el.store_lat, el.store_lng));
          customOverlay.setMap(map);
        });
      });
    }
  }, []);

  return (
    <>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} openLoginModalHandler={openLoginModalHandler} />
      <div id="map" />
      <Search />
      <Footer />
    </>
  );
};

export default Map;
