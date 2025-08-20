import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkedAlt, FaPhone, FaSearch, FaShoppingCart, FaTruck } from 'react-icons/fa';
import './Header.css'; // If using CSS modules, see note below
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Header: React.FC = () => {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("");
    const router = useRouter();

    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userName, setUserName] = useState('Guest');

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/search?query=${encodeURIComponent(search)}`);
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const handleLogout = () => {
        // Logic to handle user logout
        setUserLoggedIn(false);
        setUserName('Guest');
        // Optionally redirect to home or login page
        router.push('/');
    };

    return (
        <header className="header">
            <div className="header-top">
                <div className="header-top-left">
                    <a className="facebook-link" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="social-icon-facebook" />
                    </a>
                    <a className="whatsapp-link" href="https://wa.me/message/V54FWAK6EAIHK1" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp className="social-icon-whatsapp" />
                    </a>
                    <a className="instagram-link" href="https://www.instagram.com/_gift_article/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="social-icon-instagram" />
                    </a>
                    <div className='icon-text'>
                        <FaPhone className="icon" />+91-9054344963
                    </div>
                    <a href='mailto:giftarticle00@gmail.com' className='icon-text'>
                        <FaEnvelope className='icon' /> giftarticle00@gmail.com
                    </a>
                </div>
                <div className="header-top-right">
                    <div className='icon-text'>
                        <FaMapMarkedAlt className="icon" /> Ahmedabad, India
                    </div>
                    <Link href="/track-order" className='icon-text'>
                        <FaTruck className="icon" /> Track Order
                    </Link>
                    {userLoggedIn ? (
                        <div className='user-info'>
                            <span>Hello, {userName}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className='icon-link'>
                                Login
                            </Link> |
                            <Link href="/signup" className='icon-link'>
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="header-container">
                <div className="header-left">
                    <button className="mobile-menu-button" onClick={toggleMenu}>
                        ☰
                    </button>
                    {/* Logo Section */}
                    <Link href="/">
                        <div className="header-logo-section">
                            <img src="/images/logo.png" alt="Logo" className="header-logo" />
                            <span className="header-title">Gift Article</span>
                        </div>
                    </Link>
                </div>
                {/* Dropdown Nav */}
                <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
                    <ul className="nav-menu">
                        <li className="nav-item"><a href="/">Home</a></li>
                        <li className="nav-item"><a href="#products">Products</a></li>
                        <li className="nav-item"><a href="#testimonials">Reviews</a></li>
                        <li className="nav-item"><a href="#about-us">About Us</a></li>
                        <li className="nav-item"><a href="#gallery">Gallery</a></li>
                        {/* <li className="nav-item"><a href="#faq">FAQ</a></li>
                        <li className="nav-item"><a href="#terms">Terms & Conditions</a></li> */}
                        <li className="nav-item"><a href="#inquiry-form">Any Inquiry?</a></li>
                    </ul>
                </nav>
                {/* Search Bar */}
                <div className="header-right">
                    <form onSubmit={handleSearch} className="header-search-form">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search For Gifts....."
                            className="header-search-input"
                        />
                        <button type="submit" className="header-search-btn" aria-label="Search">
                            <FaSearch />
                        </button>
                    </form>
                    {/* Login & Cart */}
                    <Link href="/cart" className="icon-link">
                        <FaShoppingCart className="icon" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;