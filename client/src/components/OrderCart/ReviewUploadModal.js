import React, { useState } from 'react';
import axios from 'axios';

function ReviewUploadModal({ navigate, openReviewModalHandler, orderedMeal, setOrderedMeal }) {
  const accessToken = localStorage.getItem('accessToken');
  const [reviewInfo, setReviewInfo] = useState({
    reviewImage: '',
    reviewText: '',
  });

  const handleChange = key => e => {
    setReviewInfo({ ...reviewInfo, [key]: e.target.value });
  };
  const reviewSubmitHandler = e => {
    const { reviewImage, reviewText } = reviewInfo;
    const imageFile = e.reviewImage.slice(12);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/review`,
        {
          store_id: orderedMeal[0].menu.store.store_id,
          menu_id: orderedMeal[0].menu.menu_id,
          review_image: reviewImage,
          review_content: reviewText,
        },
        { headers: { authorization: `Bearer ${accessToken}` }, withCredentials: true }
      )
      .then(res => {
        alert('리뷰가 등록되었습니다');
        navigate('/maps');
        console.log('------------스토어', orderedMeal[0].menu.store.store_id);
        console.log('------------메뉴', orderedMeal[0].menu.menu_id);
        setOrderedMeal([]);
      })
      .catch(err => {
        console.log(err);
        alert('리뷰 등록 에러남!');
      });
  };
  return (
    <div className="review-upload-container">
      <div className="review-upload-backdrop">
        <div className="review-upload-window">
          <div className="review-upload-title-container">
            <div className="review-upload-title">음식점 리뷰</div>
            <i className="fa fa-times" onClick={openReviewModalHandler} />
          </div>
          <div className="review-upload-store-info-container">
            <img className="review-upload-store-category-icon" src={require('../../img/찌개.png').default} alt=""></img>
            <div className="review-upload-store-name">{orderedMeal[0].menu.store.store_name}</div>
          </div>
          <div className="review-upload-store-name">{orderedMeal[0].menu.menu_name}</div>
          <div className="review-upload-content-container">
            <img className="review-upload-food-image" src={reviewInfo.reviewImage} alt="" />
            <textarea
              className="review-upload-food-text"
              placeholder="리뷰를 적어주세요"
              onChange={handleChange('reviewText')}
            />
          </div>
          <div className="review-upload-button-container">
            <input
              className="review-upload-image-upload-button"
              type="file"
              accept="image/x-png, image/gif, image/jpeg"
              onChange={handleChange('reviewImage')}
            />
            <button className="review-upload-submit-button" onClick={() => reviewSubmitHandler(reviewInfo)}>
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewUploadModal;
