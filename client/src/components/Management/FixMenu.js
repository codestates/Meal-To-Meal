import React from 'react';

function FixMenu({ item, handleFixInputValue }) {
  return (
    <div className="FixMenu-container">
      <div className="FixMenu-add-img-container">
        <img className="FixMenu-img" src={require('../../img/dummy/menu_dummy/만두전골.jpg').default} alt="" />
        <input type="file" className="FixMenu-menu-img-input" />
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
