import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Review() {
  const [userReviews, setUserReviews] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

  const getDetailReviewHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/review-list`, {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data);
        setUserReviews(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteReviewHandler = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/review/reviewid`, {
        headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(res => {
        // setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetailReviewHandler();
  }, []);
  return (
    <>
      <div className="review-container">
        <div className="review-title-info-container">
          <div className="review-icon-text-container">
            <img className="review-title-icon" src={require('../../img/찌개.png').default} alt="" />
            <div className="store-text">인백</div>
          </div>
          <div className="review-icon-text-container">
            <i className="far fa-calendar-alt" />
            <div className="store-text">2021-11-23</div>
          </div>
        </div>
        <div className="review-img-info-container">
          {/* <img
            className="review-store-img"
            src={`https://meal2sdk.s3.ap-northeast-2.amazonaws.com/%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%E1%84%8B%E1%85%B3%E1%86%AF+%E1%84%8B%E1%85%B5%E1%86%B8%E1%84%85%E1%85%A7%E1%86%A8%E1%84%92%E1%85%A2%E1%84%8C%E1%85%AE%E1%84%89%E1%85%A6%E1%84%8B%E1%85%AD_-001+(6).png`}
            alt=""
          /> */}
          <div className="review-store-info-container">
            <div className="review-menu-title">티라노 립아이</div>
            <div className="store-text">
              티라노 고기는 첨 먹어보는데 쫄깃하고 육즙이 살아있는게 넘 맛있었습니다. 추천합니다!!
            </div>
          </div>
        </div>
        <button className="review-delete-button" onClick={deleteReviewHandler}>
          삭제
        </button>
      </div>
    </>
  );
}

export default Review;
