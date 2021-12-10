import React from 'react';

function SearchResultSidebar({ searchResult }) {
  return (
    <div className="SearchResultSidebar-window">
      {searchResult.map(el => (
        <div className="SearchResult-info-container">
          <div className="SearchResult-info">
            <div className="SearchResult-title">{el.store_name}</div>
            <div className="SearchResult-text">{el.store_category}</div>
            <div className="SearchResult-text">{el.store_address}</div>
            <div className="SearchResult-text">{el.business_hour}</div>
            <div className="SearchResult-text-container">
              <img className="SearchResult-icon" src={require('../../img/donation.png').default} alt="" />
              <div className="SearchResult-text">{el.store_order_quantity}</div>
            </div>
          </div>
          <img className="SearchResult-img" src={require('../../img/meal-to-meal-logo-192.png').default} alt="" />
        </div>
      ))}
    </div>
  );
}

export default SearchResultSidebar;
