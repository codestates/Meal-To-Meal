import './styles/App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import UnderbarLogin from './components/UnderbarLogin';
import UnderbarNotLogin from './components/UnderbarNotLogin';
import NotFound from './pages/NotFound';
import Landing from '../src/pages/Landing';
import Map from '../src/pages/Map';
import LoginModal from './components/LoginModal';
import StoreInfo from '../src/pages/StoreInfo';
const dotenv = require('dotenv');
dotenv.config();
import ShareCart from '../src/pages/ShareCart';


function App() {
  const [accessToken, setAccessToken] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenSignupModal, setIsOpenSigupModal] = useState(false);
  const [cartItem, setCartItem] = useState([]);

  const donationClickhandler = item => {
    setCartItem([...cartItem, item]);
    alert('장바구니에 추가되었습니다');
    // '/cart'
  };

  const navigate = useNavigate();

  const issueTokens = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth`, {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then(res => {
        setIsLogin(true);
      })
      .catch(err => {
        setIsLogin(false);
        alert('토크니가 만료 되옷오용! 헤헷! ^^');
      });
    navigate('/');
  };

  const openLoginModalHandler = () => {
    setIsOpenLoginModal(!isOpenLoginModal);
  };

  const openSignupModalHandler = () => {
    setIsOpenSigupModal(!isOpenSignupModal);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}`, {
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route
          path="/map"
          element={
            <Map
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              openLoginModalHandler={openLoginModalHandler}
              openSignupModalHandler={openSignupModalHandler}
              setAccessToken={setAccessToken}
              navigate={navigate}
            />
          }
        />
        <Route path="/storeinfo" element={<StoreInfo isLogin={isLogin} setIsLogin={setIsLogin} donationClickhandler={donationClickhandler}/>} />
        <Route path="/sharecart" element={<ShareCart isLogin={isLogin} setIsLogin={setIsLogin} cartItem={cartItem} setCartItem={setCartItem}/>} />
      </Routes>
      {isLogin ? (
        <UnderbarLogin />
      ) : (
        <UnderbarNotLogin
          isOpenLoginModal={isOpenLoginModal}
          openLoginModalHandler={openLoginModalHandler}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
        />
      )}
      {isOpenLoginModal ? (
        <LoginModal
          openLoginModalHandler={openLoginModalHandler}
          isOpenSignupModal={isOpenSignupModal}
          openSignupModalHandler={openSignupModalHandler}
          setAccessToken={setAccessToken}
          setIsLogin={setIsLogin}
          navigate={navigate}
        />
      ) : null}
    </div>
  );
}

export default App;
