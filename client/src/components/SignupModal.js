import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Policy from './Policy';

function SignupModal({ openSignupModalHandler }) {
  const [isOpenPolicyModal, setIsOpenPolicyModal] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    user_email: '',
    user_password: '',
    verifyPassword: '',
    user_nickname: '',
  });

  const [validation, setValidation] = useState({
    email: false,
    checkEmail: false,
    password: false,
    verifyPassword: false,
    nickname: false,
    checkNickname: false,
  });

  const [message, setMessage] = useState({
    email: '이메일을 입력해주세요.',
    password: '비밀번호는 8글자 이상, 영문, 숫자 조합이어야 합니다.',
    verifyPassword: '비밀번호를 확인해주세요.',
    nickname: '닉네임은 특수문자를 제외한 2 ~ 20 글자이어야 합니다.',
  });

  function isEmail(asValue) {
    var regExp = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(asValue);
  }

  function isPassword(asValue) {
    var regExp = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
    return regExp.test(asValue);
  }

  function isNickname(asValue) {
    var regExp = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
    return regExp.test(asValue);
  }

  const handleOnblurEmail = key => e => {
    if (!isEmail(signupInfo.user_email)) {
      setMessage({ ...message, email: '올바른 이메일 주소가 아닙니다.' });
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/email`, {
        [key]: e.target.value,
      })
      .then(res => {
        setValidation({ ...validation, checkEmail: true });
        setMessage({ ...message, email: '사용 가능한 이메일입니다.' });
      })
      .catch(err => {
        setValidation({ ...validation, checkEmail: false });
        setMessage({ ...message, email: '이미 가입된 이메일입니다.' });
      });
  };

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

  const handleSignup = () => {
    const { user_email, user_password, user_nickname } = signupInfo;
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/signup`, {
        user_email,
        user_password,
        user_nickname,
      })
      .then(res => {
        alert('회갑 됨. 로긴하셈');
        openSignupModalHandler();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const enterKey = e => {
    if (e.type === 'keypress' && e.code === 'Enter' && isValid) return handleSignup();
  };

  const isValid =
    validation.email &&
    validation.checkEmail &&
    validation.password &&
    validation.verifyPassword &&
    validation.nickname &&
    validation.checkNickname;

  const openPolicyModalHandler = () => {
    setIsOpenPolicyModal(!isOpenPolicyModal);
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
      email: isEmail(signupInfo.user_email),
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
    <div className="signup-modal-container" onClick={e => e.stopPropagation()}>
      <div className="signup-modal-backdrop">
        <div className="signup-modal-window">
          <div className="signup-info-container">
            <img className="signup-logo" src={require('../img/meal-to-meal-logo-192.png').default} alt="" />
            <div className="signup-title-text">Sign Up</div>
            <form onSubmit={e => e.preventDefault()}>
              <div className="signup-input-container">
                <div className="signup-text">E-mail</div>
                <input
                  className="signup-input"
                  placeholder="E-mail"
                  onKeyPress={enterKey}
                  onChange={handleInputValue('user_email')}
                  onBlur={handleOnblurEmail('user_email')}
                />
                {message.email === '이메일을 입력해주세요.' ? (
                  <div className="signup-validation-message">{message.email}</div>
                ) : message.email === '사용 가능한 이메일입니다.' ? (
                  <div className="signup-validation-ok">{message.email}</div>
                ) : (
                  <div className="signup-validation-error">{message.email}</div>
                )}
                <button className="validation-email-button">이메일 인증</button>
                <div className="signup-text">Password</div>
                <input
                  className="signup-input"
                  placeholder="password"
                  type="password"
                  onKeyPress={enterKey}
                  onChange={handleInputValue('user_password')}
                />
                {message.password === '비밀번호는 8글자 이상, 영문, 숫자 조합이어야 합니다.' ? (
                  <div className="signup-validation-message">{message.password}</div>
                ) : message.password === '사용할 수 있는 비밀번호 입니다.' ? (
                  <div className="signup-validation-ok">{message.password}</div>
                ) : (
                  <div className="signup-validation-error">{message.password}</div>
                )}
                <div className="signup-text">Verify Password</div>
                <input
                  className="signup-input"
                  placeholder="Verify Password"
                  type="password"
                  onKeyPress={enterKey}
                  onChange={handleInputValue('verifyPassword')}
                />
                {message.verifyPassword === '비밀번호를 확인해주세요.' ? (
                  <div className="signup-validation-message">{message.verifyPassword}</div>
                ) : message.verifyPassword === '비밀번호가 일치합니다.' ? (
                  <div className="signup-validation-ok">{message.verifyPassword}</div>
                ) : (
                  <div className="signup-validation-error">{message.verifyPassword}</div>
                )}
                <div className="signup-text">Nickname</div>
                <input
                  className="signup-input"
                  placeholder="Nickname"
                  onKeyPress={enterKey}
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
                <div className="signup-button-container">
                  {isValid ? (
                    <button className="signup-button-ok" type="submit" onClick={handleSignup}>
                      Sign Up
                    </button>
                  ) : (
                    <button className="signup-button">Sign Up</button>
                  )}
                  <button className="signup-policy-button" onClick={openPolicyModalHandler}>
                    이용약관
                  </button>
                  <button className="signup-goback-button" onClick={openSignupModalHandler}>
                    닫기
                  </button>
                </div>
              </div>
            </form>
          </div>
          <img className="signup-modal-img" src={require('../img/Eating together-bro.png').default} alt="" />
        </div>
        {isOpenPolicyModal ? <Policy openPolicyModalHandler={openPolicyModalHandler} /> : null}
      </div>
    </div>
  );
}

export default SignupModal;
