import React from 'react';
import SearchResultMptyAni from './SearchResultMptyAni';

function SearchResultSidebar({ searchResult, setIsChangeCenter, setSelected }) {
  return (
    <div className="SearchResultSidebar-window">
      {searchResult.length === 0 ? (
        <SearchResultMptyAni />
      ) : (
        <>
          {searchResult.map(el => (
            <div
              className="SearchResult-info-container"
              onClick={() => {
                setIsChangeCenter({ lat: Number(el.store_lat) + 0.001, lng: Number(el.store_lng) - 0.001, zoom: 17 });
                setSelected(el);
                localStorage.setItem('clickedMarker', el.id);
              }}
            >
              <div className="SearchResult-info">
                <div className="SearchResult-title">{el.store_name.slice(0, 16)}</div>
                <div className="SearchResult-text">{el.store_category}</div>
                <div className="SearchResult-text-container">
                  <img className="SearchResult-icon" src={require('../../img/marker.png').default} alt="" />
                  <div className="SearchResult-text">{el.store_address.slice(0, 12)}...</div>
                </div>
                <div className="SearchResult-text-container">
                  <img className="SearchResult-icon" src={require('../../img/businesshour.png').default} alt="" />
                  <div className="SearchResult-text">{el.business_hour}</div>
                </div>
                <div className="SearchResult-text-container">
                  <img className="SearchResult-icon" src={require('../../img/donation.png').default} alt="" />
                  <div className="SearchResult-text">{el.store_order_quantity}</div>
                </div>
              </div>
              <img className="SearchResult-img" src={el.store_image} alt="" />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default SearchResultSidebar;
