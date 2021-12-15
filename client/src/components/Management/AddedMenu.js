import React from 'react';

function AddedMenu({ item }) {
  return (
    <div className="AddMenu-container">
      <div className="AddMenu-add-img-container">
        <img className="AddMenu-img" src={require('../../img/dummy/menu_dummy/만두전골.jpg').default} alt="" />
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
