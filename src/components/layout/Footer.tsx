import React from 'react';
import '@/components/layout/Footer.css';
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => (
  <footer className="new_footer">
    <h5 className="footer-text">
      <span className="scrolling-text">
        @2025 Customized Gifts. All rights reserved. | Designed by Priti Vanzara
      </span>
    </h5>
    <div className="social-icons">
      <a className="facebook-link" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="social-icon-facebook" />
        Facebook
      </a>
      <a className="whatsapp-link" href="https://wa.me/message/V54FWAK6EAIHK1" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp className="social-icon-whatsapp" />
        WhatsApp
      </a>
      <a className="instagram-link" href="https://www.instagram.com/_gift_article/" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="social-icon-instagram" />
        Instagram
      </a>
    </div>
  </footer>
);

export default Footer;