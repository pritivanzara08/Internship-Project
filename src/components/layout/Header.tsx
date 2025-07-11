import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkedAlt, FaPhone, FaShoppingCart, FaSignInAlt, FaTractor, FaTruck } from 'react-icons/fa';
import './Header.css'; // If using CSS modules, see note below
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Header: React.FC = () => {
const [search, setSearch] = useState('');
const router = useRouter();
const [selectedCategory, setSelectedCategory] = useState("");
const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
const [userName, setUserName] = useState<string>('Guest');

const handleSearch = (e: React.FormEvent) => {
e.preventDefault();
if(search.trim()) {
    router.push(`/search?query=${encodeURIComponent(search)}`);
}
};

const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
};

const [menuOpen, setMenuOpen] = useState(false);
const toggleMenu = () => setMenuOpen(!menuOpen);

const [openDropdown, setOpenDropdown] = useState<string | null>(null);

const toggleDropdown = (category: string) => {
    setOpenDropdown(openDropdown === category ? null : category);
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
                    <FaPhone className="icon" />+91 9054344963
                </div>
                <a href='mailto:giftarticle00@gmail.com' className='icon-text'>
                    <FaEnvelope className='icon' /> giftarticle00@gmail.com
                </a>
            </div>
            <div className="header-top-right">
                <div className='icon-text'>
                    <FaMapMarkedAlt className="icon" /> Location: Your City
                </div>
                <Link href="/track-order" className='icon-text'>
                    <FaTruck className="icon" /> Track Order
                </Link>
                {userLoggedIn ? (
                    <div className='user-info'>
                        <span>Hello, {userName}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ):(
                    <>
                    <Link href="/login" className='icon-link'>
                        Login
                    </Link>
                    <Link href="/signup" className='icon-link'>
                        Signup
                    </Link>
                </>
            )}
            </div>
        </div>
        <div className="header-container">
            {/* Logo Section */}
            <Link href="/">
            <div className="header-logo-section">
                <img src="/images/logo.png" alt="Logo" className="header-logo" />
                {/* <span className="header-title">Gift Article</span> */}
            </div>
            </Link>
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="header-search-form">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search For Gifts....."
                    className="header-search-input"
                />
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-full md:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">All Categories</option>
                    <option value="birthdayitems">Birthday</option>
                    <option value="anniversaryitems">Anniversary</option>
                    <option value="leditems">LED Items</option>
                    <option value="photoframes">Photo Frame</option>
                    <option value="hampers">Hampers</option>
                    <option value="giftcards">Gift Cards</option>
                    <option value="keychain">Keychain</option>
                    <option value="festiveitems">Festivals</option>
                    <option value="weddingitems">Wedding</option>
                </select>
                <button
                    type="submit"
                    className="header-search-btn"
                >
                    Search
                </button>
            </form>
            {/* Login & Cart */}
            <div className="header-icons">
                <Link href="/cart" className="icon-link">
                    <FaShoppingCart className="icon" />
                    <span>Cart</span>
                </Link>

                <div className="auth-links">
                    <Link href="/login" className="auth-link">Login</Link>
                    <span className="divider">|</span>
                    <Link href="/signup" className="auth-link">Signup</Link>
                </div>
            </div>
        </div>
        <div className="header-nav-container">
            {/* Mobile Menu Toggle */}
            <button className="mobile-menu-button" onClick={toggleMenu}>
                ☰
            </button>
            {/* Dropdown Nav */}
            <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
            <ul className="nav-menu">
                <li className="nav-item dropdown">
                <span className="nav-link">Newly Launched</span>
                <ul className="dropdown-menu">
                    <li><Link href="/hampers">Hampers</Link></li>
                    <li><Link href="/giftcards">Gift Cards</Link></li>
                    <li><Link href="/keychain">Keychain</Link></li> 
                </ul>
                </li>

                <li className="nav-item dropdown">
                <span className="nav-link">Occasions</span>
                <ul className="dropdown-menu">
                    <li><Link href="/birthdayitems">Birthday</Link></li>
                    <li><Link href="/anniversaryitems">Anniversary</Link></li>
                    <li><Link href="/weddingitems">Wedding</Link></li>
                    <li><Link href="/festiveitems">Festivals</Link></li>
                </ul>
                </li>

                <li className="nav-item dropdown">
                <span className="nav-link">Photo Gifts</span>
                <ul className="dropdown-menu">
                    <li><Link href="/photoframes">Photo Frames</Link></li>
                    <li><Link href="/photo-cushions">Photo Cushions</Link></li>
                </ul>
                </li>

                <li className="nav-item dropdown">
                <span className="nav-link">Name Gifts</span>
                <ul className="dropdown-menu">
                    <li><Link href="/name-mugs">Name Mugs</Link></li>
                    <li><Link href="/name-led">Name LED Lights</Link></li>
                </ul>
                </li>

                <li className="nav-item dropdown">
                <span className="nav-link">Home</span>
                <ul className="dropdown-menu">
                    <li><Link href="/">Mug</Link></li>
                    <li><Link href="/">Cushion</Link></li>
                </ul>
                </li>

                <li className="nav-item dropdown">
                <span className="nav-link">Fashion & Accessories</span>
                <ul className="dropdown-menu">
                    <li><Link href="/">Earrings</Link></li>
                    <li><Link href="/">Chain Pendant</Link></li>
                </ul>
                </li>

            </ul>
            </nav>
        </div>
    </header>
  );
};

export default Header;