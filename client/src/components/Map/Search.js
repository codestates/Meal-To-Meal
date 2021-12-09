import React, { useState } from 'react';
import axios from 'axios';

function Search({ setIsOpenSearchResultSidebar, setSearchResult }) {
  const [searchText, setSearchText] = useState('');

  const keyPressHandler = e => {
    if (e.key === 'Escape') return setIsOpenSearchResultSidebar(false);
    if (e.key === 'Enter') return searchHandler();
  };

  const handleSearchTextChange = e => {
    setSearchText(e.target.value);
  };

  const searchHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/search?keyword=${searchText}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => {
        setIsOpenSearchResultSidebar(true);
        setSearchResult(res.data.searchResult);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const closeSidebarHandler = () => {
    setSearchText('');
    setIsOpenSearchResultSidebar(false);
  };

  return (
    <div className="search-container">
      <input
        className="search-store-input"
        placeholder="가게를 검색하세요."
        value={searchText}
        onKeyPress={keyPressHandler}
        onChange={handleSearchTextChange}
      />
      <i className="fas fa-search" onClick={() => searchHandler()} />
      <img
        className="search-x-icon"
        onClick={() => closeSidebarHandler()}
        src={require('../../img/x.png').default}
        alt=""
      />
    </div>
  );
}

export default Search;
