import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function SearchResultMptyAni() {
  const searchResultMptyAni = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: searchResultMptyAni.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../img/empty-review.json'),
    });
  }, []);

  return (
    <div className="SearchResultSidebar-empty-container">
      <div className="SearchResultSidebar-empty-ani" ref={searchResultMptyAni} />
      <div className="SearchResultSidebar-empty-text">검색된 결과가 없어요!</div>
    </div>
  );
}

export default SearchResultMptyAni;
