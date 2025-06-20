import React from 'react';
import './Footer.css';

const Footer: React.FC = () => (
  <footer className="new_footer text-center fixed-bottom">
    <h5 style={{ color: 'white' }}>
      <span className="scrolling-text">
        @2025 Customized Gifts. All rights reserved. | Designed by Priti Vanzara
      </span>
    </h5>
    <div className="social-icons">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        Facebook
      </a>
      <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        Instagram
      </a>
    </div>
  </footer>
);

export default Footer;