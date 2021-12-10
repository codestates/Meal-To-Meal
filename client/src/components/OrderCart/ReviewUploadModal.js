import React, { useState, useRef } from 'react';
import AWS from 'aws-sdk';
import axios from 'axios';
import Loading from '../Loading';

function ReviewUploadModal({ navigate, openReviewModalHandler, orderedMeal, setOrderedMeal, icon }) {
  const accessToken = localStorage.getItem('accessToken');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [reviewText, setReviewText] = useState(null);

  // 이미지 업로드
  const fileInput = useRef();

  const handleClick = e => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/review`,
        {
          store_id: orderedMeal[0].menu.store.store_id,
          menu_id: orderedMeal[0].menu.menu_id,
          review_image: selectedFile,
          review_content: reviewText,
        },
        { headers: { authorization: `Bearer ${accessToken}` }, withCredentials: true }
      )
      .then(res => {
        e.preventDefault();
        const s3 = new AWS.S3();
        (async () => {
          await s3
            .putObject({
              Body: fileInput.current.files[0],
              Bucket: 'meal2sdk',
              Key: fileInput.current.files[0].name,
            })
            .promise();
        })();
        alert('리뷰가 등록되었습니다');
        navigate('/maps');
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
        <form className="review-upload-window" onSubmit={handleClick}>
          <div className="review-upload-title-container">
            <div className="review-upload-title">음식점 리뷰</div>
            <i className="fa fa-times" onClick={openReviewModalHandler} />
          </div>
          <div className="review-upload-store-info-container">
            <img className="review-upload-store-category-icon" src={icon} alt=""></img>
            <div className="review-upload-store-name">{orderedMeal[0].menu.store.store_name}</div>
          </div>
          <div className="review-upload-store-name">{orderedMeal[0].menu.menu_name}</div>
          <div className="review-upload-content-container">
            <img className="review-upload-food-image" src={selectedFile} alt="" />
            <textarea className="review-upload-food-text" placeholder="리뷰를 적어주세요" onChange={setSelectedFile} />
          </div>
          <div className="review-upload-button-container">
            <input className="review-upload-image-upload-button" type="file" accept="image/*" ref={fileInput} />
            <button className="review-upload-submit-button" type="submit">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewUploadModal;
