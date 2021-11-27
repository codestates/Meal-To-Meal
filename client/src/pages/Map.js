/* global kakao */
import { get } from 'fast-levenshtein';
import React, { useEffect } from 'react';
import Markerdata from '../static/kakao_markerdata';
import '../styles/pages/Map.css';

const { kakao } = window;

const Map = () => {
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
      <div className="kakaomap-searchbox">
        <input className="kakaomap-search-input" placeholder="가게를 검색하세요" />
        <i className="fas fa-search"></i>
      </div>
      <div className="kakaomap-container" id="map"></div>
    </div>
  );
};

export default Map;
