import React from 'react';

function AddedMenu({ item, addedMenuImgRef, img }) {
  return (
    <div className="AddMenu-container">
      <div className="AddMenu-add-img-container">
        <img
          className="AddMenu-img"
          src={img}
          ref={addedMenuImgRef}
          alt=""
          onError={() => {
            return (addedMenuImgRef.current.src = 'https://meal2sdk.s3.amazonaws.com/-001_12.jpg');
          }}
        />
      </div>
      <div className="AddMenu-menu-info-container">
        <div className="AddMenu-menu-info-title">메뉴 이름</div>
        <div className="AddMenu-menu-text">{item.menu_name}</div>
        <div className="AddMenu-menu-info-title">메뉴 가격</div>
        <div className="AddMenu-menu-text">{item.menu_price}</div>
      </div>
    </div>
  );
}

export default AddedMenu;
