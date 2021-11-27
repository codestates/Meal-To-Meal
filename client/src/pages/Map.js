import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Map({ isLogin, setIsLogin }) {
  return (
    <>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <Footer />
    </>
  );
}

export default Map;
