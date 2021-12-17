import React from 'react';

function FixMenu({ item, handleFixInputValue, menuUrl, uploadImage, imgRef }) {
  return (
    <div className="FixMenu-container">
      <div className="FixMenu-add-img-container">
        <img
          className="FixMenu-img"
          src={menuUrl}
          ref={imgRef}
          alt=""
          onError={() => {
            return (imgRef.current.src = 'https://meal2sdk.s3.amazonaws.com/-001_12.jpg');
          }}
        />
        <input
          type="file"
          className="FixMenu-menu-img-input"
          accept="image/*"
          onChange={e => {
            uploadImage(e)('menu_image');
          }}
        />
      </div>
      <div className="FixMenu-menu-info-container">
        <div className="FixMenu-menu-info-title">메뉴 이름</div>
        <input
          className="FixMenu-menu-input"
          placeholder="메뉴 이름"
          defaultValue={item.menu_name}
          onChange={handleFixInputValue('menu_name', item.id)}
        />
        <div className="FixMenu-menu-info-title">메뉴 가격</div>
        <input
          className="FixMenu-menu-input"
          placeholder="숫자만 입력해 주세요."
          type="number"
          defaultValue={item.menu_price}
          onChange={handleFixInputValue('menu_price', item.id)}
        />
      </div>
    </div>
  );
}

export default FixMenu;
