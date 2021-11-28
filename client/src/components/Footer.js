import React from 'react';

function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="footer-our-info-container">
          <img className="logo" src={require('../img/meal-to-meal-logo-192.png').default} alt="" />
          <div className="footer-title-text">Sudo_Hired</div>
          <div className="footer-text">문의사항:</div>
          <div className="footer-text">hgud55@naver.com</div>
        </div>
        <div className="footer-our-info-container">
          <div className="footer-title-text">About Us</div>
          <div className="footer-text">Wiki</div>
          <div className="footer-text">Client</div>
          <div className="footer-text">Server</div>
        </div>
        <div className="footer-our-info-container">
          <div className="footer-title-text">Contact</div>
          <div className="footer-text">Jamie Park</div>
          <div className="footer-text">Seojung Noh</div>
          <div className="footer-text">Sungjun Jin</div>
          <div className="footer-text">Hendrix Lim</div>
        </div>
      </div>
      <div className="footer-copyright">Copyright 2021 Sudo_Hired, All rights reserved.</div>
    </>
  );
}

export default Footer;
