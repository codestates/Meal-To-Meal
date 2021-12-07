import React from 'react';

function UnderbarNotLogin({ openLoginModalHandler, openSignupModalHandler, navigate }) {
  return (
    <div className="underbar-container">
      <div className="underbar-menu-container">
        <i className="fas fa-key" onClick={openLoginModalHandler} />
      </div>
      <div className="underbar-menu-container">
        <i
          className="fas fa-user-plus"
          onClick={() => {
            openLoginModalHandler();
            openSignupModalHandler();
          }}
        />
      </div>
      <div className="underbar-menu-container">
        <i className="fas fa-map-marked-alt" onClick={() => navigate('/map')} />
      </div>
    </div>
  );
}

export default UnderbarNotLogin;
