import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmptyReviewAni from './EmptyReviewAni';

function Review({ navigate, alertMessage, setAlertMessage, openAlertHandler }) {
  const [userReviews, setUserReviews] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

  const getDetailReviewHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/review-list`, {
        headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(res => {
        setUserReviews(res.data.reviewList);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // ! 일단 안 쓰기로 합의했습니다.
  const deleteReviewHandler = idx => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/review/${idx}`, {
        headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(res => {
        setAlertMessage('리뷰가 삭제되었습니다');
        openAlertHandler();
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetailReviewHandler();
  }, [alertMessage]);

  return (
    <>
      {userReviews.length === 0 || userReviews.length === undefined ? (
        <EmptyReviewAni navigate={navigate} />
      ) : (
        <>
          {userReviews.map(el => (
            <div className="review-container">
              <div className="review-title-info-container">
                <div className="review-icon-text-container">
                  <img className="review-title-icon" src={require('../../img/찌개.png').default} alt="" />
                  <div className="store-text">{el.store.store_name}</div>
                </div>
                <div className="review-icon-text-container">
                  <i className="far fa-calendar-alt" />
                  <div className="store-text">{el.createdAt.slice(0, 10)}</div>
                </div>
              </div>
              <div className="review-img-info-container">
                <img className="review-store-img" src={el.review_image} alt="" />
                <div className="review-store-info-container">
                  <div className="review-menu-title">{el.menu.menu_name}</div>
                  <div className="store-text">{el.review_content}</div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Review;
