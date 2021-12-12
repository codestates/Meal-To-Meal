import React from 'react';

function AddMenu() {
  return (
    <div className="AddMenu-container">
      <div className="AddMenu-add-img-container">
        <img className="AddMenu-img" src={require('../../img/dummy/menu_dummy/만두전골.jpg').default} alt="" />
        <input type="file" className="AddMenu-menu-img-input" />
      </div>
      <div className="AddMenu-menu-info-container">
        <div className="AddMenu-menu-info-title">메뉴 이름</div>
        <input className="AddMenu-menu-input" />
        <div className="AddMenu-menu-info-title">메뉴 가격</div>
        <input className="AddMenu-menu-input" />
      </div>
    </div>
  );
}

export default AddMenu;
