import './styles/App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UnderbarLogin from './components/UnderbarLogin';
import UnderbarNotLogin from './components/UnderbarNotLogin';
import NotFound from './pages/NotFound';
import Landing from '../src/pages/Landing';
import Map from '../src/pages/Map';
import LoginModal from './components/LoginModal';
import StoreInfo from '../src/pages/StoreInfo';
import ShareCart from '../src/pages/ShareCart';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenSignupModal, setIsOpenSigupModal] = useState(false);
  const [cartItem, setCartItem] = useState([]);

  const donationClickhandler = item => {
    setCartItem([...cartItem, item]);
    alert('장바구니에 추가되었습니다');
    // '/cart'
  };

  const openLoginModalHandler = () => {
    setIsOpenLoginModal(!isOpenLoginModal);
  };

  const openSignupModalHandler = () => {
    setIsOpenSigupModal(!isOpenSignupModal);
  };

  const logoutBtnHandler = () => {};

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}`, {
        withCredentials: true,
      })
      .then(res => {
        console.log('나는 클라다');
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route
            path="/map"
            element={<Map isLogin={isLogin} setIsLogin={setIsLogin} openLoginModalHandler={openLoginModalHandler} />}
          />
          <Route
            path="/storeinfo"
            element={
              <StoreInfo isLogin={isLogin} setIsLogin={setIsLogin} donationClickhandler={donationClickhandler} />
            }
          />
          <Route
            path="/sharecart"
            element={
              <ShareCart isLogin={isLogin} setIsLogin={setIsLogin} cartItem={cartItem} setCartItem={setCartItem} />
            }
          />
        </Routes>
      </BrowserRouter>
      {isLogin ? (
        <UnderbarLogin />
      ) : (
        <UnderbarNotLogin isOpenLoginModal={isOpenLoginModal} openLoginModalHandler={openLoginModalHandler} />
      )}
      {isOpenLoginModal ? (
        <LoginModal
          openLoginModalHandler={openLoginModalHandler}
          isOpenSignupModal={isOpenSignupModal}
          openSignupModalHandler={openSignupModalHandler}
          setIsLogin={setIsLogin}
        />
      ) : null}
    </div>
  );
}

export default App;
