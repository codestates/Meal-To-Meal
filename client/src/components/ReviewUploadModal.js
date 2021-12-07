import React, { useState } from 'react';

function ReviewUploadModal() {
  const [review, setReview] = useState('');
  const handleChange = e => {
    setReview(e.target.value);
  };
  return (
    <div className="review-upload-container">
      <div className="review-upload-backdrop">
        <div className="review-upload-window">
          <div className="review-upload-title">음식점 리뷰</div>
          <div className="review-upload-store-info-container">
            <img className="review-upload-store-category-icon" src={require('../img/찌개.png').default} alt=""></img>
            <div className="review-upload-store-name">국밥무라</div>
          </div>
          <div className="review-upload-food-name">원조 할매 국밥</div>
          <div className="review-upload-content-container">
            <img
              className="review-upload-food-image"
              src={require('../img/dummy/menu_dummy/김치전.jpg').default}
              alt=""
            ></img>
            <textarea className="review-upload-food-text" placeholder="리뷰를 적어주세요" onChange={handleChange} />
          </div>
          <div className="review-upload-button-container">
            <input
              className="review-upload-image-upload-button"
              type="file"
              accept="image/x-png, image/gif, image/jpeg"
            />
            <button className="review-upload-submit-button">등록하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewUploadModal;
