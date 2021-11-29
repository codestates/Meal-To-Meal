import React from 'react';

function SignupModal({ openSignupModalHandler }) {
  const signupButtonHandler = () => {
    alert('회원가입 성공!......이었으면 좋겠지만, 아직 서버와 연결 되지 않았습니다!');
  };

  const enterKey = e => {
    if (e.key === 'Enter') return signupButtonHandler();
  };

  return (
    <div className="signup-modal-window">
      <div className="signup-info-container">
        <img className="signup-logo" src={require('../img/meal-to-meal-logo-192.png').default} alt="" />
        <div className="signup-title-text">Sign Up</div>
        <div className="signup-input-container">
          <div className="signup-text">E-mail</div>
          <input className="signup-input" placeholder="E-mail" onKeyPress={enterKey}></input>
          <div className="signup-validation-message">이메일을 입력 해 주세요</div>
          <div className="signup-text">Password</div>
          <input className="signup-input" placeholder="password" onKeyPress={enterKey}></input>
          <div className="signup-validation-message">비밀번호를를 입력 해 주세요</div>
          <div className="signup-text">Verify Password</div>
          <input className="signup-input" placeholder="id" onKeyPress={enterKey}></input>
          <div className="signup-validation-message">다시 비밀번호를 입력 해 주세요</div>
          <div className="signup-text">Nickname</div>
          <input className="signup-input" placeholder="id" onKeyPress={enterKey}></input>
          <div className="signup-validation-message">닉네임을 입력 해 주세요</div>
          <div className="signup-text">Phone</div>
          <div className="signup-phone-container">
            <input className="signup-phone-input" type="text" placeholder="Phone Number" onKeyPress={enterKey}></input>
            <button className="signup-phone-button">전화번호 인증</button>
          </div>
          <div className="signup-validation-message">전화번호 인증을 해 주세요</div>
          <div className="signup-button-container">
            <button onClick={signupButtonHandler}>Sign Up</button>
            <button className="signup-goback-button" onClick={openSignupModalHandler}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;
