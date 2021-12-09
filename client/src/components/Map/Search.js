import React, { useState } from 'react';
import axios from 'axios';

function Search({ isOpenSearchResultSidebar, setIsOpenSearchResultSidebar, setSearchResult }) {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = e => {
    setSearchText(e.target.value);
  };

  const searchHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/search?keyword=${searchText}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => {
        setSearchResult(res.data.searchResult);
        setIsOpenSearchResultSidebar(!isOpenSearchResultSidebar);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="search-container">
      <input className="search-store-input" placeholder="가게를 검색하세요." onChange={handleSearchTextChange} />
      <i className="fas fa-search" onClick={() => searchHandler()} />
    </div>
  );
}

export default Search;
