import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmptyStoreReviewAni from './EmptyStoreReviewAni';

function ReviewBox() {
  const [storeReviews, setStoreReviews] = useState([]);
  const storeReviewDetailHandler = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return;
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/review-list/${Number(localStorage.getItem('clickedMarker'))}`, {
          headers: { authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        })
        .then(res => {
          setStoreReviews(res.data.reviewList);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    storeReviewDetailHandler();
  }, []);

  return (
    <>
      {storeReviews.length === 0 || storeReviews.length === undefined ? (
        <EmptyStoreReviewAni />
      ) : (
        <>
          {storeReviews.map(el => (
            <div className="reviewBox-container">
              <img className="storeinfo-food-image" src={el.review_image} alt="" />
              <div className="reviewBox-info-container">
                <div className="reviewBox-reviewer-name">{el.user.user_nickname}님</div>
                <div className="reviewBox-reviewer-review">{el.review_content}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default ReviewBox;
