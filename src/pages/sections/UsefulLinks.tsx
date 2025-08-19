import React from 'react';
import "../../styles/ContactUs.css";
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const UsefulLinks = () => {
  return (
    <section className="useful-links-section">
      <h2 className='beautiful-title'>Useful Links</h2>
      <div className="useful-links-grid four-columns">
        <div className="links-group">
          <h4>Policies & More</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/videos">Videos</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
          </ul>
        </div>
        <div className="links-group">
          <h4>Navigate</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/testimonials">Testimonials</a></li>
          </ul>
        </div>
        <div className="links-group">
          <h4>Contact</h4>
          <ul className="contact-list">
            <li>Address : 123 Main St, Anytown, USA</li>
            <li><a href="tel:+919054344963">Phone : +91 9054344963</a></li>
            <li><a href="mailto:giftarticle00@gmail.com">Email : giftarticle00@gmail.com</a></li>
          </ul>
        </div>
        <div className="links-group">
          <h4>Follow Us</h4>
          <ul className="social-list">
            <a className="facebook-link" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon-facebook" />
            </a>
            <a className="whatsapp-link" href="https://wa.me/message/V54FWAK6EAIHK1" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="social-icon-whatsapp" />
            </a>
            <a className="instagram-link" href="https://www.instagram.com/_gift_article/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon-instagram" />
            </a>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default UsefulLinks;