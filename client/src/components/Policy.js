import React from 'react';

function Policy({ openPolicyHandler }) {
  return (
    <div className="policy-modal-container">
      <div className="policy-modal-backdrop">
        <div className="policy-modal-window">
          <div className="policy-title-container">
            <img className="policy-title-icon" src={require('../img/meal-to-meal-logo-192.png').default} alt="" />
            <div className="policy-title-text">통합서비스 약관 (주)HIRED</div>
          </div>
          <div className="policy-content-container">
            <div className="policy-content-text">
              제 1 장 환영합니다!
              <br />
              제 1 조 (목적 및 정의)
              <br />
              주식회사 HIRED(이하 ‘회사’)가 제공하는 서비스를 이용해 주셔서 감사합니다.
              <br />
              회사는 여러분이 회사가 제공 하는 다양한 인터넷과 모바일 서비스 등을 의미하며 이하 해당 서비스들을 모두
              합하여 “통합서비스” 또는 “서비스”라 함)에 더 가깝고 편리하게 다가갈 수 있도록 ‘HIRED 통합서비스약 관’(이하
              ‘본 약관’)을 마련하였습니다.
              <br />
              여러분은 본 약관에 동의함으로써 통합서비스에 가입하여 통합서비스를 이용할 수 있습니다. 단, 여러분은 회사가
              아닌 계열사를 포함한 제3자가 제공하는 서비스에 가입되지는 않으며, 회사가 제공하는 유료서비스의 경우 여러분
              이 별도의 유료이용약관에 대한 동의한 때에 회사와 여러분 간의 유료서비스 이용계약이 성립합니다. 본 약관 은
              여러분이 통합서비스를 이용하는 데 필요한 권리, 의무 및 책임사항, 이용조건 및 절차 등 기본적인 사항 을
              규정하고 있으므로 조금만 시간을 내서 주의 깊게 읽어주시기 바랍니다.
              <br />• 서비스: 회사가 제공하는1) “HIRED” 브랜드를 사용하는 서비스 또는 2) 밥 계정으로 이용하는 서비스
              사는 즉시 여러분의 통합서비스 이용을 정지시키거나 밥계정을 삭제하는 등 적절한 제한을 할 수 있습니다.
            </div>
          </div>
          <div className="policy-button-container">
            <button className="policy-close-button" onClick={openPolicyHandler}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Policy;
