import './styles/App.css';
import axios from 'axios';
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import UnderbarLogin from './components/UnderbarLogin';
import UnderbarNotLogin from './components/UnderbarNotLogin';
import NotFound from './pages/NotFound';
import Landing from '../src/pages/Landing';
import Map from '../src/pages/Map';
import LoginModal from './components/LoginModal';
import StoreInfo from '../src/pages/StoreInfo';
import ShareCart from '../src/pages/ShareCart';
const dotenv = require('dotenv');
dotenv.config();

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenSignupModal, setIsOpenSigupModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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
        navigate('/');
      });
  };

  const removeFromCart = item => {
    const found = cartItems.filter(el => el.id === item.id);
    const index = cartItems.findIndex(el => el.id === found[0].id);
    setCartItems([...cartItems.slice(0, index), ...cartItems.slice(index + 1, cartItems.length)]);
  };

  const setQuantity = found => {
    if (found[0].quantity > 0) {
      found[0].quantity++;
    }
    setCartItems([...cartItems]);
  };

  const addToCart = item => {
    const found = cartItems.filter(el => el.id === item.id);
    if (found[0]) {
      setQuantity(found);
    } else {
      setCartItems([
        ...cartItems,
        { id: item.id, name: item.menu_name, price: item.menu_price, img: item.menu_image, quantity: 1 },
      ]);
    }
  };

  const openLoginModalHandler = () => {
    setIsOpenLoginModal(!isOpenLoginModal);
  };

  const openSignupModalHandler = () => {
    setIsOpenSigupModal(!isOpenSignupModal);
  };

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
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              issueTokens={issueTokens}
              navigate={navigate}
            />
          }
        />
        <Route
          path="/storeinfo"
          element={
            <StoreInfo
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
              setQuantity={setQuantity}
            />
          }
        />
        <Route
          path="/sharecart"
          element={
            <ShareCart
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              cartItems={cartItems}
              setCartItems={setCartItems}
              removeFromCart={removeFromCart}
            />
          }
        />
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
