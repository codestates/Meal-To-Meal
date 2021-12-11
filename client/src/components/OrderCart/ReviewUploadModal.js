import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import S3FileUpload from 'react-s3';
import Loading from '../Loading';

function ReviewUploadModal({ navigate, openReviewModalHandler, orderedMeal, setOrderedMeal }) {
  const accessToken = localStorage.getItem('accessToken');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState('');
  const [reviewText, setReviewText] = useState(null);
  const [url, setUrl] = useState('');

  const imgRef = useRef();
  const config = {
    bucketName: 'meal2sdk',
    region: 'ap-northeast-2',
    accessKeyId: `${process.env.REACT_APP_SDK_ACCESSKEY_ID}`,
    secretAccessKey: `${process.env.REACT_APP_SDK_SECRETACCESS_KEY}`,
  };

  const getDetailUserMealHandler = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user-meal`, {
        headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(res => {
        setOrderedMeal([res.data.userMeal]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleClick = file => {
    setSelectedFile(file.name);
    S3FileUpload.uploadFile(file, config)
      .then(data => setUrl(data.location))
      .catch(err => console.error(err));
  };

  const reviewSubmitHandler = e => {
    e.preventDefault();

    getDetailUserMealHandler();

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/review`,
        {
          store_id: orderedMeal[0].menu.store.store_id,
          menu_id: orderedMeal[0].menu.menu_id,
          review_image: url,
          review_content: reviewText,
        },
        { headers: { authorization: `Bearer ${accessToken}` }, withCredentials: true }
      )
      .then(res => {
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
        <form className="review-upload-window" onSubmit={reviewSubmitHandler}>
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
            <img
              className="review-upload-food-image"
              src={url}
              ref={imgRef}
              alt=""
              onError={() => {
                return (imgRef.current.src =
                  'https://meal2sdk.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2021-09-19+%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB+3.11.14.png');
              }}
            />
            <textarea className="review-upload-food-text" placeholder="리뷰를 적어주세요" />
          </div>
          <div className="review-upload-button-container">
            <input
              className="review-upload-image-upload-button"
              type="file"
              accept="image/*"
              onChange={e => handleClick(e.target.files[0])}
            />
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
