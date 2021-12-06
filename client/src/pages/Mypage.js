import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/pages/Mypage.css';

import Review from '../components/Review';

function Mypage({ navigate, setAlertMessage, openAlertHandler, openWarningAlertHandler, alertMessage }) {
  const [isOpenFixNicknameToggle, setIsOpenFixNicknameToggle] = useState(false);
  const [isOpenFixPasswordToggle, setIsOpenFixPasswordToggle] = useState(false);

  const openFixNicknameToggleHandler = () => {
    setIsOpenFixNicknameToggle(!isOpenFixNicknameToggle);
  };

  const openFixPasswordToggleHandler = () => {
    setIsOpenFixPasswordToggle(!isOpenFixPasswordToggle);
  };

  const [userInfo, setUserInfo] = useState({});

  const [signupInfo, setSignupInfo] = useState({
    user_nickname: '',
    user_password: '',
    verifyPassword: '',
  });

  const [validation, setValidation] = useState({
    nickname: false,
    checkNickname: false,
    password: false,
    verifyPassword: false,
  });

  const userInfoHandler = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/mypage`, {
          headers: { authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        })
        .then(res => {
          setUserInfo(res.data.userInfo);
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
          setAlertMessage('페스워드가 변경되었습니다.');
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

  const isValidForNickname = validation.nickname && validation.checkNickname;
  const isValidForPassword = validation.password && validation.verifyPassword;

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
                {message.nickname === '닉네임은 특수문자를 제외한 2 ~ 20 글자이어야 합니다.' ? (
                  <div className="signup-validation-message">{message.nickname}</div>
                ) : message.nickname === '사용 가능한 닉네임입니다.' ? (
                  <div className="signup-validation-ok">{message.nickname}</div>
                ) : (
                  <div className="signup-validation-error">{message.nickname}</div>
                )}
              </div>
            </form>
          ) : null}
          <div className="mypage-myinfo-email">{userInfo.user_email}</div>
          <span className="mypage-fix-myinfo-toggle-button" onClick={openFixPasswordToggleHandler}>
            비밀번호 수정
          </span>
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
          <button className="mypage-withdrawal-button" onClick={() => navigate('/withdrawal')}>
            회원탈퇴
          </button>
        </div>
        <div className="mypage-title">최근 리뷰 내역</div>
        <div className="mypage-review-container">
          <Review />
        </div>
      </div>
    </>
  );
}

export default Mypage;
