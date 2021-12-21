import React from 'react';

function FixMenu({ fixedMenuImgRef, uploadImage, deleteMenuHandler, handleFixInputValue, item, img }) {
  return (
    <div className="AddMenu-container">
      <div className="AddMenu-add-img-container">
        <img
          className="AddMenu-img"
          src={img}
          ref={fixedMenuImgRef}
          alt=""
          onError={() => {
            return (fixedMenuImgRef.current.src = 'https://meal2sdk.s3.amazonaws.com/-001_12.jpg');
          }}
        />
        <input
          type="file"
          className="AddMenu-menu-img-input"
          onChange={e => {
            uploadImage(e, item.id)('fix_menu_image');
          }}
        />
      </div>
      <div className="AddMenu-menu-info-container">
        <div className="AddMenu-menu-info-title">메뉴 이름</div>
        <input
          className="AddMenu-menu-input"
          placeholder="메뉴 이름"
          defaultValue={item.menu_name}
          onChange={handleFixInputValue('menu_name', item.id)}
        />
        <div className="AddMenu-menu-info-title">메뉴 가격</div>
        <input
          className="AddMenu-menu-input"
          placeholder="숫자만 입력해 주세요."
          type="number"
          min="1000"
          defaultValue={item.menu_price}
          onChange={handleFixInputValue('menu_price', item.id)}
        />
        <button className="AddMenu-menu-delete-button" onClick={() => deleteMenuHandler(item.id)}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default FixMenu;
