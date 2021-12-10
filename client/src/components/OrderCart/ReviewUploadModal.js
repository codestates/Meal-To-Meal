import React, { useState, useRef, useEffect } from 'react';
import AWS from 'aws-sdk';
import axios from 'axios';
import Loading from '../Loading';

function ReviewUploadModal({ navigate, openReviewModalHandler, orderedMeal, setOrderedMeal }) {
  const accessToken = localStorage.getItem('accessToken');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [reviewText, setReviewText] = useState(null);
  const [imgName, setImgName] = useState('');

  const imgRef = useRef();

  AWS.config.update({
    region: 'ap-northeast-2',
    apiVersion: 'latest',
    credentials: {
      accessKeyId: `${process.env.REACT_APP_SDK_ACCESSKEY_ID}`,
      secretAccessKey: `${process.env.REACT_APP_SDK_SECRETACCESS_KEY}`,
    },
  });

  const handleFileInput = e => {
    const file = e.target.files[0];
    setImgName(file.name);

    const s3 = new AWS.S3();
    (async () => {
      await s3
        .putObject({
          Body: file,
          Bucket: 'meal2sdk',
          Key: file.name,
          ContentType: 'application/xml',
        })
        .promise();
    })();
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

  const reviewSubmitHandler = e => {
    e.preventDefault();

    getDetailUserMealHandler();

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/review`,
        {
          store_id: orderedMeal[0].menu.store.store_id,
          menu_id: orderedMeal[0].menu.menu_id,
          review_image: imgName,
          review_content: reviewText,
        },
        { headers: { authorization: `Bearer ${accessToken}` }, withCredentials: true }
      )
      .then(res => {
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
            <img
              className="review-upload-food-image"
              ref={imgRef}
              src={`https://meal2sdk.s3.ap-northeast-2.amazonaws.com/${imgName}`}
              onError={() => {
                return (imgRef.current.src =
                  'https://mealtomeal-img-container.s3.ap-northeast-2.amazonaws.com/main-qimg-960aef0da890432b31e29774f02c2b37-lq.jpeg');
              }}
            />
            <textarea className="review-upload-food-text" placeholder="리뷰를 적어주세요" onChange={setSelectedFile} />
          </div>
          <div className="review-upload-button-container">
            <input className="review-upload-image-upload-button" type="file" onChange={handleFileInput} />
            <label htmlFor="upload" className="image-upload-wrapper"></label>
            <button className="review-upload-submit-button" onClick={reviewSubmitHandler}>
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewUploadModal;
