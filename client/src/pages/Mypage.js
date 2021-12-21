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
          setAlertMessage('닉네임이 변경되었습니다.');
          openAlertHandler();
          openFixNicknameToggleHandler();
        })
        .catch(err => {
          setAlertMessage('잘못된 요청입니다.');
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
          setAlertMessage('패스워드가 변경되었습니다.');
          openAlertHandler();
          openFixPasswordToggleHandler();
        })
        .catch(err => {
          setAlertMessage('잘못된 요청입니다.');
          openWarningAlertHandler();
          console.log(err);
        });
    }
  };

  const [message, setMessage] = useState({
    password: '비밀번호는 8글자 이상, 영문, 숫자 조합이어야 합니다.',
    verifyPassword: '비밀번호를 확인해주세요.',
    nickname: '닉네임은 특수문자를 제외한 2 ~ 20 글자이어야 합니다.',
  });

  function isPassword(asValue) {
    var regExp = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
    return regExp.test(asValue);
  }

  function isNickname(asValue) {
    var regExp = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
    return regExp.test(asValue);
  }

  const handleOnblurName = key => e => {
    if (!isNickname(signupInfo.user_nickname)) {
      setMessage({ ...message, nickname: '특수문자는 입력이 불가능 합니다.' });
      return;
    }
    if (signupInfo.user_nickname.length > 20 || signupInfo.user_nickname.length < 2) {
      setMessage({ ...message, nickname: '2 ~ 20 글자이어야 합니다.' });
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/nickname`, {
        [key]: e.target.value,
      })
      .then(res => {
        setValidation({ ...validation, checkNickname: true });
        setMessage({ ...message, nickname: '사용 가능한 닉네임입니다.' });
      })
      .catch(err => {
        setValidation({ ...validation, checkNickname: false });
        setMessage({ ...message, nickname: '중복된 닉네임입니다.' });
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
        setAlertMessage('이미 가입된 전화번호입니다.');
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
        setAlertMessage('잘못 입력하셨거나 만료된 인증번호입니다.');
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
            ? '사용할 수 있는 비밀번호 입니다.'
            : '비밀번호는 영문, 숫자 조합이어야 합니다.'
          : '비밀번호는 8글자 이상, 영문, 숫자 조합이어야 합니다.',
      verifyPassword:
        signupInfo.verifyPassword.length >= signupInfo.user_password.length && signupInfo.verifyPassword.length >= 8
          ? signupInfo.verifyPassword === signupInfo.user_password
            ? '비밀번호가 일치합니다.'
            : '비밀번호가 불일치합니다.'
          : '비밀번호를 확인해주세요.',
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
          <div className="mypage-title">내 정보</div>
          <div className="mypage-myinfo-container">
            <div className="mypage-myinfo-nickname">환영합니다! '{userInfo.user_nickname}'님</div>
            <span className="mypage-fix-myinfo-toggle-button" onClick={openFixNicknameToggleHandler}>
              닉네임 수정
            </span>
            {isOpenFixNicknameToggle ? (
              <form className="mypage-fix-toggle-container" onSubmit={e => e.preventDefault()}>
                <div className="nickname-container">
                  <div className="fix-toggle-title">닉네임</div>
                  <div className="fix-toggle-container">
                    <input
                      className="fix-toggle-input"
                      onChange={handleInputValue('user_nickname')}
                      onBlur={handleOnblurName('user_nickname')}
                    />
                    {message.nickname === '닉네임은 특수문자를 제외한 2 ~ 20 글자이어야 합니다.' ? (
                      <div className="signup-validation-message">{message.nickname}</div>
                    ) : message.nickname === '사용 가능한 닉네임입니다.' ? (
                      <div className="signup-validation-ok">{message.nickname}</div>
                    ) : (
                      <div className="signup-validation-error">{message.nickname}</div>
                    )}
                    {isValidForNickname ? (
                      <button className="fix-toggle-button" onClick={fixNicknameHandler} type="submit">
                        수정
                      </button>
                    ) : (
                      <button className="fix-toggle-button" disabled={true}>
                        수정
                      </button>
                    )}
                  </div>
                </div>
              </form>
            ) : null}
            <div className="mypage-myinfo-email">
              {userInfo.user_email === '' ? '이메일 제공 동의를 하지 않으셨습니다.' : userInfo.user_email}
            </div>
            {isKakaoLogin === 'kakao' ? (
              <span className="mypage-fix-myinfo-not-toggle-button" disabled={true}>
                카카오 계정으로 로그인 하신 계정은 비밀번호 수정을 하실 수 없습니다
              </span>
            ) : (
              <span className="mypage-fix-myinfo-toggle-button" onClick={openFixPasswordToggleHandler}>
                비밀번호 수정
              </span>
            )}

            {isOpenFixPasswordToggle ? (
              <form className="mypage-fix-toggle-container" onSubmit={e => e.preventDefault()}>
                <div className="password-container">
                  <div className="fix-toggle-title">비밀번호</div>
                  <input className="fix-toggle-input" type="password" onChange={handleInputValue('user_password')} />
                  {message.password === '비밀번호는 8글자 이상, 영문, 숫자 조합이어야 합니다.' ? (
                    <div className="signup-validation-message">{message.password}</div>
                  ) : message.password === '사용할 수 있는 비밀번호 입니다.' ? (
                    <div className="signup-validation-ok">{message.password}</div>
                  ) : (
                    <div className="signup-validation-error">{message.password}</div>
                  )}
                </div>
                <div className="password-container">
                  <div className="fix-toggle-title">비밀번호 확인</div>
                  <input className="fix-toggle-input" type="password" onChange={handleInputValue('verifyPassword')} />
                  {isValidForPassword ? (
                    <button className="fix-toggle-button" onClick={fixPasswordHandler}>
                      수정
                    </button>
                  ) : (
                    <button className="fix-toggle-button" disabled={true}>
                      수정
                    </button>
                  )}
                  {message.verifyPassword === '비밀번호를 확인해주세요.' ? (
                    <div className="signup-validation-message">{message.verifyPassword}</div>
                  ) : message.verifyPassword === '비밀번호가 일치합니다.' ? (
                    <div className="signup-validation-ok">{message.verifyPassword}</div>
                  ) : (
                    <div className="signup-validation-error">{message.verifyPassword}</div>
                  )}
                </div>
              </form>
            ) : null}
            {isVerification ? (
              <div className="mypage-phone-verification-success-container">
                <div className="mypage-phone-verification-success-text">휴대폰 인증</div>
                <img className="mypage-phone-verification-check" src={require('../img/check.png').default} alt="" />
              </div>
            ) : (
              <div className="mypage-phone-verification-failure-container">
                <div className="mypage-phone-verification-button" onClick={openPhoneModalHandler}>
                  휴대폰 인증
                </div>
                <img
                  className="mypage-phone-verification-not-check"
                  src={require('../img/notcheck.png').default}
                  alt=""
                />
              </div>
            )}

            <button className="mypage-withdrawal-button" onClick={() => navigate('/withdrawal')}>
              회원탈퇴
            </button>
            <img className="mypage-myinfo-deco-image" src={require('../img/mypage-myinfo.png').default} alt="" />
          </div>
        </div>
        <div className="mypage-right-container">
          <div className="mypage-title">최근 리뷰 내역</div>
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
