import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import EmptyDonationAni from '../components/MyDonation/EmptyDonationAni';
import DonationBox from '../components/MyDonation/DonationBox';
import '../styles/pages/MyDonation.css';

function MyDonation() {
  const accessToken = localStorage.getItem('accessToken');
  const [isLoading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState({});
  const [donationList, setDonationList] = useState({});

  const getUserReviewHandler = () => {
    if (!accessToken) {
      return;
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/mypage`, {
          headers: { authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        })
        .then(res => {
          setIsUser(res.data.userInfo);
          getUserReviews();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const getUserReviews = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/cart`, {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then(res => {
        setDonationList(res.data.donationList);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserReviewHandler();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mydonation-container">
          <div className="mydonation-left-container">
            <div className="mydonation-ranking-title">기부 현황</div>
            <div className="mydonation-ranking-container">
              <div className="mydonation-ranking-text-container">
                <div className="mydonation-money-total">{`${isUser.user_nickname}님은 ${isUser.createdAt.slice(
                  0,
                  4
                )}년 부터 총 ${isUser.user_donation_count}그릇, ₩${Number(
                  isUser.user_donation_money
                ).toLocaleString()}원 기부하셨습니다!`}</div>
              </div>
              <img className="mydonation-money-image" src={require('../img/piggybank.png').default} alt="" />
            </div>
          </div>
          <div className="mydonation-right-container">
            <div className="mydonation-history-title">내 기부 내역</div>
            <div className="mydonation-history-container">
              {donationList.length === 0 ? <EmptyDonationAni /> : <DonationBox donationList={donationList} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyDonation;
