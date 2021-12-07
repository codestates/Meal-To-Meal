import React from 'react';

function Review() {
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
          <img className="review-store-img" src={require('../../img/dummy/menu_dummy/삼계탕.jpg').default} alt="" />
          <div className="review-store-info-container">
            <div className="review-menu-title">티라노 립아이</div>
            <div className="store-text">
              티라노 고기는 첨 먹어보는데 쫄깃하고 육즙이 살아있는게 넘 맛있었습니다. 추천합니다!!
            </div>
          </div>
        </div>
        <button className="review-delete-button">삭제</button>
      </div>
    </>
  );
}

export default Review;
