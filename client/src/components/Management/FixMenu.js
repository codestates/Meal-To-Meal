import React from 'react';

function FixMenu({ fixedMenuImgRef, uploadImage, deleteMenuHandler, handleFixInputValue, item, img }) {
  return (
    <div className="FixMenu-container">
      <div className="FixMenu-add-img-container">
        <img
          className="FixMenu-img"
          src={img}
          ref={fixedMenuImgRef}
          alt=""
          onError={() => {
            return (fixedMenuImgRef.current.src = 'https://meal2sdk.s3.amazonaws.com/-001_12.jpg');
          }}
        />
        <input
          type="file"
          className="FixMenu-menu-img-input"
          onChange={e => {
            uploadImage(e, item.id)('fix_menu_image');
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
          min="1000"
          defaultValue={item.menu_price}
          onChange={handleFixInputValue('menu_price', item.id)}
        />
        <button className="FixMenu-menu-delete-button" onClick={() => deleteMenuHandler(item.id)}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default FixMenu;
