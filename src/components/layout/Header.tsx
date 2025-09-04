import "@/components/layout/Header.css";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarkedAlt,
  FaPhone,
  FaShoppingCart,
  FaTruck,
  FaUser,
  FaWhatsapp,
  FaYoutube
} from "react-icons/fa";
import SearchBar from "../common/SearchBar";
import { useAuth } from "@/context/AuthContext";

const Header: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  //fetch user location
  const [location, setLocation] = useState("Fetching location...");
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            if (data.address) {
              const city = data.address.city || data.address.town || data.address.village || "";
              const state = data.address.state || "";
              setLocation(city && state ? `${city}, ${state}` : city || state);
            } else {
              setLocation("Location not found");
            }
          } catch (error) {
            setLocation("Error fetching location");
          }
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setLocation("Location permission denied");
          } else {
            setLocation("Unable to fetch location");
          }
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-top-left">
          <a
            className="youtube-link"
            href="https://www.youtube.com/@giftarticle2324"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="social-icon-youtube" />
          </a>
          <a
            className="facebook-link"
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="social-icon-facebook" />
          </a>
          <a
            className="whatsapp-link"
            href="https://wa.me/message/V54FWAK6EAIHK1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="social-icon-whatsapp" />
          </a>
          <a
            className="instagram-link"
            href="https://www.instagram.com/_gift_article/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icon-instagram" />
          </a>
          <div className="icon-text">
            <FaPhone className="icon" />
            +91-9054344963
          </div>
          <a href="mailto:giftarticle00@gmail.com" className="icon-text">
            <FaEnvelope className="icon" /> giftarticle00@gmail.com
          </a>
        </div>
        <div className="header-top-right">
          <div className="icon-text">
            <FaMapMarkedAlt className="icon" /> {location}
          </div>
          <div className="icon-text">
            <FaUser className="icon" />
            { user ? (user.name || user.email) : 'Guest'}
            {user?.role === "admin" && <span className="admin-badge">(Admin)</span>}
          </div>
          {user ? (
            <div className="user-info">
              <span>Hello, {user.name || user.email}</span>
              {user.role === "customer" && (
                <Link href="/track-order" className="icon-text">
                  <FaTruck className="icon" /> Track Order
                </Link>
              )}
              {user.role === "admin" && (
                <Link href="/admin" className="icon-text">
                  Admin Dashboard
                </Link>
              )}
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <Link href="/login" className="icon-link">Login</Link> |{" "}
              <Link href="/signup" className="icon-link">Signup</Link>
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
        <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
          <ul className="nav-menu">
            <li className="nav-item"><Link href="/">Home</Link></li>
            <li className="nav-item"><Link href="/products">Products</Link></li>
            <li className="nav-item"><Link href="/testimonials">Reviews</Link></li>
            <li className="nav-item"><Link href="/about-us">About Us</Link></li>
            <li className="nav-item"><Link href="/gallery">Gallery</Link></li>
            <li className="nav-item"><Link href="/inquiry-form">Any Inquiry?</Link></li>
          </ul>
        </nav>
        {/* Search Bar */}
        <div className="header-right">
          <SearchBar placeholder="Search For Gifts....." />
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
