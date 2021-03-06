import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhoneVerificationModal from '../components/Mypage/PhoneVerificationModal';
import SuccessPhoneAlertAni from '../components/Mypage/SuccessPhoneAlert';
import '../styles/pages/Mypage.css';

import Review from '../components/Mypage/Review';

function Mypage({ navigate, alertMessage, setAlertMessage, openAlertHandler, openWarningAlertHandler }) {
  const accessToken = localStorage.getItem('accessToken');

  const [isOpenFixNicknameToggle, setIsOpenFixNicknameToggle] = useState(false);
  const [isOpenFixPasswordToggle, setIsOpenFixPasswordToggle] = useState(false);
  const [isOpenPhoneModal, setIsOpenPhoneModal] = useState(false);
  const [isKakaoLogin, setIsKakaoLogin] = useState('');
  const [isNumberAlert, setIsNumberAlert] = useState(false);
  const [isOpenSuccessAlert, setIsOpenSuccessAlert] = useState(false);
  const [isVerification, setIsVerification] = useState(false);

  const openFixNicknameToggleHandler = () => {
    setIsOpenFixNicknameToggle(!isOpenFixNicknameToggle);
  };

  const openFixPasswordToggleHandler = () => {
    setIsOpenFixPasswordToggle(!isOpenFixPasswordToggle);
  };

  const openSuccessAlertHandler = () => {
    setIsOpenSuccessAlert(!isOpenSuccessAlert);
  };

  const openPhoneModalHandler = () => {
    if (isOpenPhoneModal !== true) {
      setIsNumberAlert(false);
      setIsOpenPhoneModal(!isOpenPhoneModal);
    } else {
      setIsOpenPhoneModal(!isOpenPhoneModal);
    }
  };

  const [userInfo, setUserInfo] = useState({});

  const [signupInfo, setSignupInfo] = useState({
    user_nickname: '',
    user_password: '',
    verifyPassword: '',
    user_phone_number: '',
    verification_code: '',
  });

  const [validation, setValidation] = useState({
    nickname: false,
    checkNickname: false,
    password: false,
    verifyPassword: false,
  });

  const isValidForNickname = validation.nickname && validation.checkNickname;
  const isValidForPassword = validation.password && validation.verifyPassword;

  const userInfoHandler = () => {
    if (!accessToken) {
      return;
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/mypage`, {
          headers: { authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        })
        .then(res => {
          if (res.data.userInfo.user_phone_number === undefined || res.data.userInfo.user_phone_number === null) {
            setUserInfo(res.data.userInfo);
            setIsVerification(false);
            setIsKakaoLogin(res.data.userInfo.signup_method);
          } else {
            setUserInfo(res.data.userInfo);
            setIsVerification(true);
            setIsKakaoLogin(res.data.userInfo.signup_method);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    userInfoHandler();
  }, [alertMessage]);

  const fixNicknameHandler = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/user/nickname`,
          { user_nickname: signupInfo.user_nickname },
          {
            headers: { authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }
        )
        .then(res => {
          setAlertMessage('???????????? ?????????????????????.');
          openAlertHandler();
          openFixNicknameToggleHandler();
        })
        .catch(err => {
          setAlertMessage('????????? ???????????????.');
          openWarningAlertHandler();
          console.log(err);
        });
    }
  };

  const fixPasswordHandler = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/user/password`,
          { user_password: signupInfo.user_password },
          {
            headers: { authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }
        )
        .then(res => {
          setAlertMessage('??????????????? ?????????????????????.');
          openAlertHandler();
          openFixPasswordToggleHandler();
        })
        .catch(err => {
          setAlertMessage('????????? ???????????????.');
          openWarningAlertHandler();
          console.log(err);
        });
    }
  };

  const [message, setMessage] = useState({
    password: '??????????????? 8?????? ??????, ??????, ?????? ??????????????? ?????????.',
    verifyPassword: '??????????????? ??????????????????.',
    nickname: '???????????? ??????????????? ????????? 2 ~ 20 ??????????????? ?????????.',
  });

  function isPassword(asValue) {
    var regExp = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
    return regExp.test(asValue);
  }

  function isNickname(asValue) {
    var regExp = /^[\w\W???-??????-??????-???]{2,20}$/;
    return regExp.test(asValue);
  }

  const handleOnblurName = key => e => {
    if (!isNickname(signupInfo.user_nickname)) {
      setMessage({ ...message, nickname: '??????????????? ????????? ????????? ?????????.' });
      return;
    }
    if (signupInfo.user_nickname.length > 20 || signupInfo.user_nickname.length < 2) {
      setMessage({ ...message, nickname: '2 ~ 20 ??????????????? ?????????.' });
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/nickname`, {
        [key]: e.target.value,
      })
      .then(res => {
        setValidation({ ...validation, checkNickname: true });
        setMessage({ ...message, nickname: '?????? ????????? ??????????????????.' });
      })
      .catch(err => {
        setValidation({ ...validation, checkNickname: false });
        setMessage({ ...message, nickname: '????????? ??????????????????.' });
      });
  };

  const handleInputValue = key => e => {
    setSignupInfo({ ...signupInfo, [key]: e.target.value });
  };

  const phoneVerification = user_phone_number => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/phone-verification`,
        {
          user_phone_number,
        },
        {
          headers: { authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      )
      .then(res => {
        setIsNumberAlert(true);
      })
      .catch(err => {
        setAlertMessage('?????? ????????? ?????????????????????.');
        openWarningAlertHandler();
        console.log(err);
      });
  };

  const phoneVerificationComplete = (verification_code, user_phone_number) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/phone-verification/complete`,
        {
          verification_code,
          user_phone_number,
        },
        {
          headers: { authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      )
      .then(res => {
        setIsNumberAlert(false);
        setIsOpenPhoneModal(false);
        setIsVerification(true);
        openSuccessAlertHandler();
      })
      .catch(err => {
        setIsNumberAlert(false);
        setAlertMessage('?????? ?????????????????? ????????? ?????????????????????.');
        openWarningAlertHandler();
        console.log(err);
      });
  };

  useEffect(() => {
    setMessage({
      ...message,
      password:
        signupInfo.user_password.length >= 8
          ? isPassword(signupInfo.user_password)
            ? '????????? ??? ?????? ???????????? ?????????.'
            : '??????????????? ??????, ?????? ??????????????? ?????????.'
          : '??????????????? 8?????? ??????, ??????, ?????? ??????????????? ?????????.',
      verifyPassword:
        signupInfo.verifyPassword.length >= signupInfo.user_password.length && signupInfo.verifyPassword.length >= 8
          ? signupInfo.verifyPassword === signupInfo.user_password
            ? '??????????????? ???????????????.'
            : '??????????????? ??????????????????.'
          : '??????????????? ??????????????????.',
    });
    setValidation({
      ...validation,
      nickname:
        isNickname(signupInfo.user_nickname) &&
        signupInfo.user_nickname.length >= 2 &&
        signupInfo.user_nickname.length < 20,
      password: isPassword(signupInfo.user_password),
      verifyPassword: signupInfo.user_password === signupInfo.verifyPassword,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signupInfo]);

  return (
    <>
      <div className="mypage-container">
        <div className="mypage-left-container">
          <div className="mypage-title">??? ??????</div>
          <div className="mypage-myinfo-container">
            <div className="mypage-myinfo-nickname">???????????????! '{userInfo.user_nickname}'???</div>
            <span className="mypage-fix-myinfo-toggle-button" onClick={openFixNicknameToggleHandler}>
              ????????? ??????
            </span>
            {isOpenFixNicknameToggle ? (
              <form className="mypage-fix-toggle-container" onSubmit={e => e.preventDefault()}>
                <div className="nickname-container">
                  <div className="fix-toggle-title">?????????</div>
                  <div className="fix-toggle-container">
                    <input
                      className="fix-toggle-input"
                      onChange={handleInputValue('user_nickname')}
                      onBlur={handleOnblurName('user_nickname')}
                    />
                    {message.nickname === '???????????? ??????????????? ????????? 2 ~ 20 ??????????????? ?????????.' ? (
                      <div className="signup-validation-message">{message.nickname}</div>
                    ) : message.nickname === '?????? ????????? ??????????????????.' ? (
                      <div className="signup-validation-ok">{message.nickname}</div>
                    ) : (
                      <div className="signup-validation-error">{message.nickname}</div>
                    )}
                    {isValidForNickname ? (
                      <button className="fix-toggle-button" onClick={fixNicknameHandler} type="submit">
                        ??????
                      </button>
                    ) : (
                      <button className="fix-toggle-button" disabled={true}>
                        ??????
                      </button>
                    )}
                  </div>
                </div>
              </form>
            ) : null}
            <div className="mypage-myinfo-email">
              {userInfo.user_email === '' ? '????????? ?????? ????????? ?????? ??????????????????.' : userInfo.user_email}
            </div>
            {isKakaoLogin === 'kakao' ? (
              <span className="mypage-fix-myinfo-not-toggle-button" disabled={true}>
                ????????? ???????????? ????????? ?????? ????????? ???????????? ????????? ?????? ??? ????????????
              </span>
            ) : (
              <span className="mypage-fix-myinfo-toggle-button" onClick={openFixPasswordToggleHandler}>
                ???????????? ??????
              </span>
            )}

            {isOpenFixPasswordToggle ? (
              <form className="mypage-fix-toggle-container" onSubmit={e => e.preventDefault()}>
                <div className="password-container">
                  <div className="fix-toggle-title">????????????</div>
                  <input className="fix-toggle-input" type="password" onChange={handleInputValue('user_password')} />
                  {message.password === '??????????????? 8?????? ??????, ??????, ?????? ??????????????? ?????????.' ? (
                    <div className="signup-validation-message">{message.password}</div>
                  ) : message.password === '????????? ??? ?????? ???????????? ?????????.' ? (
                    <div className="signup-validation-ok">{message.password}</div>
                  ) : (
                    <div className="signup-validation-error">{message.password}</div>
                  )}
                </div>
                <div className="password-container">
                  <div className="fix-toggle-title">???????????? ??????</div>
                  <input className="fix-toggle-input" type="password" onChange={handleInputValue('verifyPassword')} />
                  {isValidForPassword ? (
                    <button className="fix-toggle-button" onClick={fixPasswordHandler}>
                      ??????
                    </button>
                  ) : (
                    <button className="fix-toggle-button" disabled={true}>
                      ??????
                    </button>
                  )}
                  {message.verifyPassword === '??????????????? ??????????????????.' ? (
                    <div className="signup-validation-message">{message.verifyPassword}</div>
                  ) : message.verifyPassword === '??????????????? ???????????????.' ? (
                    <div className="signup-validation-ok">{message.verifyPassword}</div>
                  ) : (
                    <div className="signup-validation-error">{message.verifyPassword}</div>
                  )}
                </div>
              </form>
            ) : null}
            {isVerification ? (
              <div className="mypage-phone-verification-success-container">
                <div className="mypage-phone-verification-success-text">????????? ??????</div>
                <img className="mypage-phone-verification-check" src={require('../img/check.png').default} alt="" />
              </div>
            ) : (
              <div className="mypage-phone-verification-failure-container">
                <div className="mypage-phone-verification-button" onClick={openPhoneModalHandler}>
                  ????????? ??????
                </div>
                <img
                  className="mypage-phone-verification-not-check"
                  src={require('../img/notcheck.png').default}
                  alt=""
                />
              </div>
            )}

            <button className="mypage-withdrawal-button" onClick={() => navigate('/withdrawal')}>
              ????????????
            </button>
            <img className="mypage-myinfo-deco-image" src={require('../img/mypage-myinfo.png').default} alt="" />
          </div>
        </div>
        <div className="mypage-right-container">
          <div className="mypage-title">?????? ?????? ??????</div>
          <div className="mypage-review-container">
            <Review
              navigate={navigate}
              alertMessage={alertMessage}
              setAlertMessage={setAlertMessage}
              openAlertHandler={openAlertHandler}
            />
          </div>
        </div>
        {isOpenPhoneModal ? (
          <PhoneVerificationModal
            signupInfo={signupInfo}
            setSignupInfo={setSignupInfo}
            isNumberAlert={isNumberAlert}
            setIsNumberAlert={setIsNumberAlert}
            openPhoneModalHandler={openPhoneModalHandler}
            phoneVerification={phoneVerification}
            phoneVerificationComplete={phoneVerificationComplete}
          />
        ) : null}
      </div>
      {isOpenSuccessAlert ? (
        <SuccessPhoneAlertAni navigate={navigate} openSuccessAlertHandler={openSuccessAlertHandler} />
      ) : null}
    </>
  );
}

export default Mypage;
