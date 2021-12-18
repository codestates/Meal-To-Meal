import React from 'react';

function Footer() {
  if (window.location.pathname === '/maps') return null;

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo-info-container">
          <img className="footer-logo-img" src={require('../img/meal-to-meal-logo-192.png').default} alt="" />
          <div className="footer-our-info-container">
            <div className="footer-title-text">Sudo_Hired</div>
            <div className="footer-text">문의사항: hgud55@naver.com</div>
          </div>
        </div>
        <div className="footer-our-info-container">
          <div className="footer-title-text">About Us</div>
          <a className="footer-text" href="https://github.com/codestates/Meal-To-Meal">
            Wiki
          </a>
          <a className="footer-text" href="https://github.com/codestates/Meal-To-Meal/tree/main/client">
            Client
          </a>
          <a className="footer-text" href="https://github.com/codestates/Meal-To-Meal/tree/main/server">
            Server
          </a>
        </div>
        <div className="footer-our-info-container">
          <div className="footer-title-text">Contact</div>
          <a className="footer-text" href="https://github.com/jamiep9rk">
            Jamie Park
          </a>
          <a className="footer-text" href="https://github.com/anniemon">
            Seojung Noh
          </a>
          <a className="footer-text" href="https://github.com/Jin-sungjun">
            Sungjun Jin
          </a>
          <a className="footer-text" href="https://github.com/Hendrix1995">
            Hendrix Lim
          </a>
        </div>
      </div>
      <div className="footer-copyright">Copyright 2021 Sudo_Hired, All rights reserved.</div>
    </footer>
  );
}

export default Footer;
