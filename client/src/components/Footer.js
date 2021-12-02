import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo-info-container">
          <img className="logo" src={require('../img/meal-to-meal-logo-192.png').default} alt="" />
          <div className="footer-our-info-container">
            <div className="footer-title-text">Sudo_Hired</div>
            <div className="footer-text">문의사항: hgud55@naver.com</div>
          </div>
        </div>
        <div className="footer-our-info-container">
          <div className="footer-title-text">About Us</div>
          <span className="footer-text">Wiki</span>
          <span className="footer-text">Client</span>
          <span className="footer-text">Server</span>
        </div>
        <div className="footer-our-info-container">
          <div className="footer-title-text">Contact</div>
          <span className="footer-text">Jamie Park</span>
          <span className="footer-text">Seojung Noh</span>
          <span className="footer-text">Sungjun Jin</span>
          <span className="footer-text">Hendrix Lim</span>
        </div>
      </div>
      <div className="footer-copyright">Copyright 2021 Sudo_Hired, All rights reserved.</div>
    </footer>
  );
}

export default Footer;
