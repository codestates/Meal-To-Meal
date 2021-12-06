import './styles/App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Alert from './components/Alert';
import WarningAlert from './components/WarningAlert';
import Loading from './components/Loading';
import Header from './components/Header';
import Footer from './components/Footer';
import UnderbarLogin from './components/UnderbarLogin';
import UnderbarNotLogin from './components/UnderbarNotLogin';
import NotFound from './pages/NotFound';
import EmptyShareCart from './pages/EmptyShareCart';
import EmptyOrderHistory from './pages/EmptyOrderHistory';
import Landing from '../src/pages/Landing';
import Map from '../src/pages/Map';
import LoginModal from './components/LoginModal';
import StoreInfo from '../src/pages/StoreInfo';
import ShareCart from '../src/pages/ShareCart';
import Withdrawal from '../src/pages/Withdrawal';
import Mypage from '../src/pages/Mypage';
import ReviewUploadModal from './components/ReviewUploadModal';
const dotenv = require('dotenv');
dotenv.config();

axios.defaults.withCredentials = true;
function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenWarningAlert, setIsOpenWarningAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenSignupModal, setIsOpenSignupModal] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  const issueTokens = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    } else {
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
          setAlertMessage('잘못된 요청입니다.');
          openWarningAlertHandler();
        });
    }
  };

  const getAccessToken = authorizationCode => {
    if (authorizationCode) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/oauth/kakao/login`,
          {
            authorizationCode,
          },
          {
            withCredentials: true,
          }
        )
        .then(res => {
          localStorage.setItem('accessToken', res.data.accessToken);
          setIsLogin(true);
          navigate('/map');
        })
        .catch(err => {
          setAlertMessage('잘못된 요청입니다.');
          openWarningAlertHandler();
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    } else {
      issueTokens();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFromCart = item => {
    const found = cartItems.filter(el => el.id === item.id);
    const index = cartItems.findIndex(el => el.id === found[0].id);
    setCartItems([...cartItems.slice(0, index), ...cartItems.slice(index + 1, cartItems.length)]);
  };

  const setQuantity = found => {
    if (found[0].quantity > 0 && found[0].quantity < 100) {
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
    setIsOpenSignupModal(!isOpenSignupModal);
  };

  const openAlertHandler = () => {
    setIsOpenAlert(!isOpenAlert);
    setTimeout(() => setIsOpenAlert(false), 1800);
  };

  const openWarningAlertHandler = () => {
    setIsOpenWarningAlert(!isOpenWarningAlert);
    setTimeout(() => setIsOpenWarningAlert(false), 1800);
  };

  return (
    <div className="App">
      <Header
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        openLoginModalHandler={openLoginModalHandler}
        openSignupModalHandler={openSignupModalHandler}
        issueTokens={issueTokens}
        navigate={navigate}
        openAlertHandler={openAlertHandler}
        openWarningAlertHandler={openWarningAlertHandler}
        setAlertMessage={setAlertMessage}
      />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/empty" element={<EmptyShareCart />} />
        <Route path="/emptyhistory" element={<EmptyOrderHistory />} />
        <Route path="/withdrawal" element={<Withdrawal setIsLogin={setIsLogin} />} />
        <Route path="/reviewmodal" element={<ReviewUploadModal />} />
        <Route path="/mypage" element={<Mypage navigate={navigate} />} />
        <Route
          path="/map"
          element={
            <Map
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              openLoginModalHandler={openLoginModalHandler}
              openSignupModalHandler={openSignupModalHandler}
              issueTokens={issueTokens}
              navigate={navigate}
              openAlertHandler={openAlertHandler}
              openWarningAlertHandler={openWarningAlertHandler}
              setAlertMessage={setAlertMessage}
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
              cartItems={cartItems}
              setCartItems={setCartItems}
              openLoginModalHandler={openLoginModalHandler}
              openSignupModalHandler={openSignupModalHandler}
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
        <UnderbarLogin
          setIsLogin={setIsLogin}
          navigate={navigate}
          openAlertHandler={openAlertHandler}
          openWarningAlertHandler={openWarningAlertHandler}
          setAlertMessage={setAlertMessage}
        />
      ) : (
        <UnderbarNotLogin
          isOpenLoginModal={isOpenLoginModal}
          openLoginModalHandler={openLoginModalHandler}
          openWarningAlertHandler={openWarningAlertHandler}
          setAlertMessage={setAlertMessage}
        />
      )}
      {isOpenLoginModal ? (
        <LoginModal
          openLoginModalHandler={openLoginModalHandler}
          isOpenSignupModal={isOpenSignupModal}
          openSignupModalHandler={openSignupModalHandler}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          navigate={navigate}
          openAlertHandler={openAlertHandler}
          openWarningAlertHandler={openWarningAlertHandler}
          setAlertMessage={setAlertMessage}
        />
      ) : null}
      {isOpenAlert ? <Alert openAlertHandler={openAlertHandler} alertMessage={alertMessage} /> : null}
      {isOpenWarningAlert ? (
        <WarningAlert openWarningAlertHandler={openWarningAlertHandler} alertMessage={alertMessage} />
      ) : null}
      <Footer />
    </div>
  );
}

export default App;
