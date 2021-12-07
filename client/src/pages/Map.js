// eslint-disable-next-line no-unused-vars
/* global kakao */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from '../components/Search';
import '../styles/pages/Map.css';

const { kakao } = window;

const Map = ({ navigate, setMarkerStoreInfo }) => {
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

  useEffect(() => {
    const container = document.getElementById('map');

    const options = {
      center: new kakao.maps.LatLng(37.512186, 126.996333),
      level: 7,
    };

    const map = new kakao.maps.Map(container, options);

    var clickedOverlay = null;

    // eslint-disable-next-line no-lone-blocks
    {
      storeList.forEach(el => {
        var content = document.createElement('div');
        content.classList.add('customOverlay-container');
        content.style.position = 'absolute';

        var closeBtn = document.createElement('i');
        closeBtn.classList.add('customOverlay-close-button');
        closeBtn.classList.add('fas', 'fa-times');
        closeBtn.onclick = function () {
          customOverlay.setMap(null);
        };
        content.appendChild(closeBtn);

        var img = document.createElement('img');
        img.classList.add('customOverlay-img');
        img.src = el.store_image;
        img.alt = '';
        img.onclick = function () {
          localStorage.setItem('clickedMarker', el.id);
          navigate(`/store/:${el.id}`);
        };
        content.appendChild(img);

        var infoContainer = document.createElement('div');
        infoContainer.classList.add('customOverlay-info-container');
        content.appendChild(infoContainer);

        var infoLeftContainer = document.createElement('div');
        infoLeftContainer.classList.add('customOverlay-info-left-container');
        infoContainer.appendChild(infoLeftContainer);

        var infoTitleContainer = document.createElement('div');
        infoTitleContainer.classList.add('customOverlay-title-container');
        infoLeftContainer.appendChild(infoTitleContainer);

        var infoTitle = document.createElement('div');
        infoTitle.classList.add('customOverlay-title');
        infoTitle.appendChild(document.createTextNode(el.store_name));
        infoTitle.onclick = function () {
          localStorage.setItem('clickedMarker', el.id);
          navigate(`/store/:${el.id}`);
        };
        infoTitleContainer.appendChild(infoTitle);

        var infoCategory = document.createElement('div');
        infoCategory.classList.add('customOverlay-category');
        infoCategory.appendChild(document.createTextNode(el.store_category));
        infoTitleContainer.appendChild(infoCategory);

        var infoBusinesshourContainer = document.createElement('div');
        infoBusinesshourContainer.classList.add('customOverlay-businesshour-container');
        infoTitleContainer.appendChild(infoBusinesshourContainer);

        var infoBusinesshourIcon = document.createElement('i');
        infoBusinesshourIcon.classList.add('fas', 'fa-business-time');
        infoBusinesshourContainer.appendChild(infoBusinesshourIcon);

        var infoBusinesshourInfo = document.createElement('div');
        infoBusinesshourInfo.classList.add('customOverlay-businesshour-info');
        infoBusinesshourInfo.appendChild(document.createTextNode(el.business_hour));
        infoBusinesshourContainer.appendChild(infoBusinesshourInfo);

        var infoDonationContainer = document.createElement('div');
        infoDonationContainer.classList.add('customOverlay-donation-container');
        infoTitleContainer.appendChild(infoDonationContainer);

        var infoDonationIcon = document.createElement('i');
        infoDonationIcon.classList.add('fas', 'fa-heart');
        infoDonationContainer.appendChild(infoDonationIcon);

        var infoDonationInfo = document.createElement('div');
        infoDonationInfo.classList.add('customOverlay-donation-info');
        infoDonationInfo.appendChild(document.createTextNode(el.store_order_quantity));
        infoDonationContainer.appendChild(infoDonationInfo);

        var infoPlaceContainer = document.createElement('div');
        infoPlaceContainer.classList.add('customOverlay-place-container');
        infoLeftContainer.appendChild(infoPlaceContainer);

        var infoPlaceIcon = document.createElement('i');
        infoPlaceIcon.classList.add('fas', 'fa-map-marker-alt');
        infoPlaceContainer.appendChild(infoPlaceIcon);

        var infoPlaceInfo = document.createElement('div');
        infoPlaceInfo.classList.add('customOverlay-place-info');
        if (el.store_address.length >= 20) {
          infoPlaceInfo.appendChild(document.createTextNode(el.store_address.slice(0, 20) + '...'));
        } else {
          infoPlaceInfo.appendChild(document.createTextNode(el.store_address));
        }
        infoPlaceContainer.appendChild(infoPlaceInfo);

        var infoDescriptionContainer = document.createElement('div');
        infoDescriptionContainer.classList.add('customOverlay-description-container');
        infoLeftContainer.appendChild(infoDescriptionContainer);

        var infoDescriptionIcon = document.createElement('i');
        infoDescriptionIcon.classList.add('fas', 'fa-utensils');
        infoDescriptionContainer.appendChild(infoDescriptionIcon);

        var infoDescriptionInfo = document.createElement('div');
        infoDescriptionInfo.classList.add('customOverlay-donation-info');
        if (el.store_description.length >= 21) {
          infoDescriptionInfo.appendChild(document.createTextNode(el.store_description.slice(0, 21) + '...'));
        } else {
          infoDescriptionInfo.appendChild(document.createTextNode(el.store_description));
        }
        infoDescriptionContainer.appendChild(infoDescriptionInfo);

        const customOverlay = new kakao.maps.CustomOverlay({
          content: content,
          position: new kakao.maps.LatLng(el.store_lat, el.store_lng),
        });

        const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(el.store_lat, el.store_lng),
          clickable: true,
        });

        kakao.maps.event.addListener(marker, 'click', function panTo() {
          if (clickedOverlay) {
            clickedOverlay.setMap(null);
          }

          var moveLatLon = new kakao.maps.LatLng(el.store_lat - 0.02, el.store_lng);
          map.setLevel(7, {
            anchor: new kakao.maps.LatLng(el.store_lat - 0.03, el.store_lng + 0.02),
          });
          map.panTo(moveLatLon);
          customOverlay.setMap(map);
          clickedOverlay = customOverlay;
        });
      });
    }
  }, [storeList]);

  return (
    <>
      <div id="map" />
      <Search />
    </>
  );
};

export default Map;
