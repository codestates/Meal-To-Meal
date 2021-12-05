import React, { useState } from 'react';

function ReviewUploadModal() {
  const [review, setReview] = useState('');
  const handleChange = e => {
    setReview(e.target.value);
  };
  //   const onFoodChange = async food => {
  //     const formData = new FormData();
  //     formData.append('file', food.target.files[0]);
  //     const response = await apiClient.post('', formData);
  //   };
  return (
    <div className="review-modal-container">
      <div className="review-modal-backdrop">
        <div className="review-modal-window">
          <div className="review-modal-title-container">
            <div className="review-title-text">음식점 리뷰</div>
            <button className="review-submit-button">등록하기</button>
          </div>
          <div className="review-store-info-container">
            <img className="review-store-category-icon" src={require('../img/찌개.png').default} alt=""></img>
            <div className="review-store-name">원조할매국밥</div>
          </div>
          <div className="review-food-name">원조 할매 국밥</div>
          <div className="review-user-content-container">
            <img className="review-food-image" src={require('../img/dummy/menu_dummy/김치전.jpg').default} alt=""></img>
            <textarea className="review-food-text" placeholder="리뷰를 적어주세요" onChange={handleChange} />
          </div>
          <input
            className="review-image-upload-button"
            type="file"
            accept="image/x-png, image/gif, image/jpeg"
            //     onChange={onFoodChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ReviewUploadModal;
