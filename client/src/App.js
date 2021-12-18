import './styles/App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Alert from './components/Alert/Alert';
import WarningAlert from './components/Alert/WarningAlert';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';
import UnderbarLogin from './components/Underbar/UnderbarLogin';
import UnderbarNotLogin from './components/Underbar/UnderbarNotLogin';
import NotFound from './pages/NotFound';
import Landing from '../src/pages/Landing';
import Maps from './pages/Maps';
import LoginModal from './components/Login/LoginModal';
import StoreInfo from '../src/pages/StoreInfo';
import ShareCart from '../src/pages/ShareCart';
import UserMeal from '../src/pages/UserMeal';
import Withdrawal from '../src/pages/Withdrawal';
import Mypage from '../src/pages/Mypage';
import Management from './pages/Management';
import AddStore from './pages/AddStore';
import FixStore from './pages/FixStore';
import MyDonation from './pages/MyDonation';

// 카테고리 이미지
import 분식 from './img/category/분식.png';
import 빵 from './img/category/베이커리.png';
import 야식 from './img/category/야식.png';
import 양식 from './img/category/양식.png';
import 일식 from './img/category/일식.png';
import 중식 from './img/category/중식.png';
import 패스트푸드 from './img/category/패스트푸드.png';
import 한식 from './img/category/한식.png';

const dotenv = require('dotenv');
dotenv.config();

axios.defaults.withCredentials = true;

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [kakaoLogin, setKakaoLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenWarningAlert, setIsOpenWarningAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [detailStoreInfo, setDetailStoreInfo] = useState({});
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenSignupModal, setIsOpenSignupModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const getImage = e => {
    if (e === '분식') return 분식;
    if (e === '빵') return 빵;
    if (e === '야식') return 야식;
    if (e === '양식') return 양식;
    if (e === '일식') return 일식;
    if (e === '중식') return 중식;
    if (e === '패스트푸드') return 패스트푸드;
    if (e === '한식') return 한식;
  };

  const issueTokens = () => {
    const accessToken = localStorage.getItem('accessToken');
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
        console.log(err);
      });
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
          setKakaoLogin(true);
          setIsLoading(false);
          localStorage.setItem('accessToken', res.data.accessToken);
          setIsLogin(true);
          navigate('/maps');
        })
        .catch(err => {
          setIsLogin(false);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode) {
      setIsLoading(true);
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
    setTimeout(() => setIsOpenAlert(false), 4000);
  };

  const openWarningAlertHandler = () => {
    setIsOpenWarningAlert(!isOpenWarningAlert);
    setTimeout(() => setIsOpenWarningAlert(false), 4000);
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
        setKakaoLogin={setKakaoLogin}
      />
      <Routes>
        <Route exact path="/" element={<Landing navigate={navigate} />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route
          path="/withdrawal"
          element={
            <Withdrawal
              setIsLogin={setIsLogin}
              openAlertHandler={openAlertHandler}
              openWarningAlertHandler={openWarningAlertHandler}
              setAlertMessage={setAlertMessage}
            />
          }
        />
        <Route
          path="/mypage"
          element={
            <Mypage
              navigate={navigate}
              setAlertMessage={setAlertMessage}
              openAlertHandler={openAlertHandler}
              openWarningAlertHandler={openWarningAlertHandler}
              alertMessage={alertMessage}
              kakaoLogin={kakaoLogin}
              getImage={getImage}
            />
          }
        />
        <Route
          path="/management"
          element={
            <Management
              navigate={navigate}
              getImage={getImage}
              setAlertMessage={setAlertMessage}
              openAlertHandler={openAlertHandler}
              openWarningAlertHandler={openWarningAlertHandler}
            />
          }
        />
        <Route
          path="/addstore"
          element={
            <AddStore
              navigate={navigate}
              setAlertMessage={setAlertMessage}
              openWarningAlertHandler={openWarningAlertHandler}
              openAlertHandler={openAlertHandler}
            />
          }
        />
        <Route
          path="/fixstore"
          element={
            <FixStore
              navigate={navigate}
              openWarningAlertHandler={openWarningAlertHandler}
              openAlertHandler={openAlertHandler}
              setAlertMessage={setAlertMessage}
            />
          }
        />
        <Route path="/maps" element={<Maps navigate={navigate} />} />
        <Route
          path="/store/:storeid"
          element={
            <StoreInfo
              issueTokens={issueTokens}
              navigate={navigate}
              setAlertMessage={setAlertMessage}
              isLogin={isLogin}
              addToCart={addToCart}
              openAlertHandler={openAlertHandler}
              openWarningAlertHandler={openWarningAlertHandler}
              openLoginModalHandler={openLoginModalHandler}
              openSignupModalHandler={openSignupModalHandler}
              detailStoreInfo={detailStoreInfo}
              setDetailStoreInfo={setDetailStoreInfo}
              getImage={getImage}
            />
          }
        />
        <Route
          path="/sharecart"
          element={
            <ShareCart
              openAlertHandler={openAlertHandler}
              issueTokens={issueTokens}
              navigate={navigate}
              isLogin={isLogin}
              cartItems={cartItems}
              setCartItems={setCartItems}
              removeFromCart={removeFromCart}
              getImage={getImage}
              openWarningAlertHandler={openWarningAlertHandler}
              setAlertMessage={setAlertMessage}
            />
          }
        />
        <Route path="/usermeal" element={<UserMeal navigate={navigate} getImage={getImage} />} />
        <Route path="/mydonation" element={<MyDonation getImage={getImage} />} />
      </Routes>
      {isLogin ? (
        <UnderbarLogin
          setIsLogin={setIsLogin}
          navigate={navigate}
          openAlertHandler={openAlertHandler}
          openWarningAlertHandler={openWarningAlertHandler}
          setAlertMessage={setAlertMessage}
          setKakaoLogin={setKakaoLogin}
        />
      ) : (
        <UnderbarNotLogin
          openLoginModalHandler={openLoginModalHandler}
          openSignupModalHandler={openSignupModalHandler}
          navigate={navigate}
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
      {isLoading ? <Loading /> : null}
      <Footer />
    </div>
  );
}

export default App;
