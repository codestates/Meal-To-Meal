import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/pages/Mypage.css';

import Review from '../components/Review';

function Mypage({ navigate }) {
  const [isOpenFixNicknameToggle, setIsOpenFixNicknameToggle] = useState(false);
  const [isOpenFixPasswordToggle, setIsOpenFixPasswordToggle] = useState(false);

  const openFixNicknameToggleHandler = () => {
    setIsOpenFixNicknameToggle(!isOpenFixNicknameToggle);
  };

  const openFixPasswordToggleHandler = () => {
    setIsOpenFixPasswordToggle(!isOpenFixPasswordToggle);
  };

  const [userInfo, setUserInfo] = useState({});

  const userInfoHandler = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/mypage`, {
          headers: { authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        })
        .then(res => {
          console.log(res);
          // setUserInfo로 유저정보를 클라도 가질 수 있다!
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    userInfoHandler();
  }, []);

  return (
    <>
      <div className="mypage-container">
        <div className="mypage-title">내 정보</div>
        <div className="mypage-myinfo-container">
          <div className="mypage-myinfo-nickname">환영합니다! '기부악마'님</div>
          <span className="mypage-fix-myinfo-toggle-button" onClick={openFixNicknameToggleHandler}>
            닉네임 수정
          </span>
          {isOpenFixNicknameToggle ? (
            <div className="mypage-fix-toggle-container">
              <div className="nickname-container">
                <div className="fix-toggle-title">닉네임</div>
                <div className="fix-toggle-container">
                  <input className="fix-toggle-input" />
                  <button className="fix-toggle-button">수정</button>
                </div>
                <div className="fix-toggle-validation-message">닉네임을 입력해 주세요</div>
              </div>
            </div>
          ) : null}
          <div className="mypage-myinfo-email">hgud55@naver.com</div>
          <span className="mypage-fix-myinfo-toggle-button" onClick={openFixPasswordToggleHandler}>
            비밀번호 수정
          </span>
          {isOpenFixPasswordToggle ? (
            <div className="mypage-fix-toggle-container">
              <div className="password-container">
                <div className="fix-toggle-title">비밀번호</div>
                <input className="fix-toggle-input" type="password" />
                <div className="fix-toggle-validation-message">비밀번호를 입력해 주세요</div>
              </div>
              <div className="password-container">
                <div className="fix-toggle-title">비밀번호 확인</div>
                <input className="fix-toggle-input" type="password" />
                <button className="fix-toggle-button">수정</button>
                <div className="fix-toggle-validation-message">비밀번호를 입력해 주세요</div>
              </div>
            </div>
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