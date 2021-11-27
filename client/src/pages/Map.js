/* global kakao */
import React, { useEffect } from 'react';

const { kakao } = window;

const Map = () => {
  useEffect(() => {
    let container = document.getElementById('map');

    let options = {
      center: new window.kakao.maps.LatLng(35.85133, 127.734086),
      level: 13,
    };
    let map = new window.kakao.maps.Map(container, options);
    let markerPosition = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488);
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '800px', height: '800px' }}></div>
    </div>
  );
};

export default Map;
