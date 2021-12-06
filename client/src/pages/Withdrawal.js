import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/pages/Withdrawal.css';
import axios from 'axios';

function Withdrawal({ setIsLogin }) {
  const navigate = useNavigate();
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [fillinText, setFillinText] = useState('');

  const agreeCheckHandler = () => {
    setAgreeChecked(!agreeChecked);
  };
  const fillinCheckHandler = e => {
    setFillinText(e.target.value);
  };

  const withdrawalSubmitHandler = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/user/withdrawal`, {
        headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}`, 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(res => {
        setIsLogin(false);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      <Header />
      <div className="withdrawal-container">
        <div className="withdrawal-title">탈퇴 안내</div>
        <div className="withdrawal-content-container">
          <div className="withdrawal-content-text">
            회원탈퇴를 신청하기 전에 안내사항을 꼭 확인해주세요.
            <br />
            등록하셨던 데이터는 모두 삭제되며, 다시 복구 할 수 없습니다.
            <br />
            회원님이 하셨던 따뜻한 나눔들은 회원님의 마음속에서 영원히 함께 할 것입니다.
            <br />
            그동안 사용해주셔서 감사합니다.
          </div>
          <div className="withdrawal-checkbox-container">
            <input className="checkbox-input-check" type="checkbox" onClick={agreeCheckHandler} />
            <div className="checkbox-agree-text">안내사항을 모두 확인하였으며, 이에 동의합니다</div>
          </div>
          <div className="withdrawal-fillin-container">
            <div className="fillin-text">"탈퇴합니다"를 정확히 입력해주세요</div>
            <input className="fillin-input" onChange={fillinCheckHandler} />
          </div>
          <div className="withdrawal-button-container">
            {agreeChecked === true && fillinText === '탈퇴합니다' ? (
              <button className="withdrawal-submit-button" disabled={false} onClick={withdrawalSubmitHandler}>
                탈퇴하기
              </button>
            ) : (
              <button className="withdrawal-submit-button" disabled={true}>
                탈퇴하기
              </button>
            )}
            <button className="withdrawal-cancel-button" onClick={() => navigate('/map')}>
              취소 (홈으로)
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Withdrawal;
