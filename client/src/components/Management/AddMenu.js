import React from 'react';

function AddMenu({ handleInputValue, uploadImage, menuUrl, addMenuImgRef }) {
  return (
    <div className="AddMenu-container">
      <div className="AddMenu-add-img-container">
        <img
          className="AddMenu-img"
          src={menuUrl ? menuUrl[0].addMenuUrl : ''}
          ref={addMenuImgRef ? addMenuImgRef : null}
          alt=""
          onError={() => {
            return addMenuImgRef ? (addMenuImgRef.current.src = 'https://meal2sdk.s3.amazonaws.com/-001_12.jpg') : null;
          }}
        />
        <input
          type="file"
          className="AddMenu-menu-img-input"
          accept="image/*"
          onChange={e => {
            uploadImage(e)('add_menu_image');
          }}
        />
      </div>
      <div className="AddMenu-menu-info-container">
        <div className="AddMenu-menu-info-title">메뉴 이름</div>
        <input className="AddMenu-menu-input" placeholder="메뉴 이름" onChange={handleInputValue('menu_name')} />
        <div className="AddMenu-menu-info-title">메뉴 가격</div>
        <input
          className="AddMenu-menu-input"
          placeholder="숫자만 입력해 주세요."
          type="number"
          min="1000"
          onChange={handleInputValue('menu_price')}
        />
      </div>
    </div>
  );
}

export default AddMenu;
