import React from 'react';

function UnderbarNotLogin({ openLoginModalHandler }) {
  return (
    <div className="underbar-container">
      <div className="underbar-menu-container">
        <i className="fas fa-key" onClick={openLoginModalHandler} />
      </div>
      <div className="underbar-menu-container">
        <i className="fas fa-user-plus" />
      </div>
      <div className="underbar-menu-container">
        <i className="fas fa-map-marked-alt" />
      </div>
    </div>
  );
}

export default UnderbarNotLogin;
