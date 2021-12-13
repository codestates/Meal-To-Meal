import React from 'react';

function PhoneVerificationModal({
  signupInfo,
  setSignupInfo,
  openPhoneModalHandler,
  phoneVerification,
  phoneVerificationComplete,
  isNumberAlert,
}) {
  return (
    <div className="phone-modal-container">
      <div className="phone-modal-backdrop">
        <div className="phone-modal-window">
          <div className="phone-modal-title-container">
            <div className="phone-modal-text">휴대폰 인증</div>
            <img
              className="phone-modal-close"
              src={require('../../img/x.png').default}
              alt=""
              onClick={openPhoneModalHandler}
            />
          </div>
          <form className="phone-modal-content-container" onSubmit={e => e.preventDefault()}>
            <input
              className="phone-modal-number-input"
              onChange={e => setSignupInfo({ ...signupInfo, user_phone_number: e.target.value })}
              placeholder="'-'를 제외한 휴대폰 번호를 입력하세요"
            ></input>
            <button
              className="phone-modal-number-submit"
              onClick={() => phoneVerification(signupInfo.user_phone_number)}
            >
              인증 번호 발송
            </button>
            {isNumberAlert ? (
              <div className="phone-modal-number-alert-text">
                인증번호가 발송되었습니다.
                <br />
                3분 내에 인증번호를 아래 칸에 입력해주세요.
              </div>
            ) : null}
            <div className="phone-modal-verification-container">
              <input
                className="phone-modal-verification-input"
                onChange={e => setSignupInfo({ ...signupInfo, verification_code: e.target.value })}
                placeholder="인증번호"
              ></input>
              <button
                className="phone-modal-verification-submit"
                onClick={() => phoneVerificationComplete(signupInfo.verification_code, signupInfo.user_phone_number)}
              >
                확인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PhoneVerificationModal;
