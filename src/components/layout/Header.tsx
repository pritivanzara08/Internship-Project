import React , {useState} from 'react';
import Link from 'next/link';
import './Header.css'; // If using CSS modules, see note below
import { useRouter } from 'next/router';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Header: React.FC = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(search.trim()) {
        router.push(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  return (
    <header className="header">
        <div className="header-container">
            {/* Logo Section */}
            <Link href="/" className="header-logo-section">
                <img src="/images/logo.png" alt="Logo" className="header-logo" />
                <span className="header-title">Gift Article</span>
            </Link>
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="header-search-form">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products / Categories..."
                    className="header-search-input"
                />
                <button
                    type="submit"
                    className="header-search-btn"
                >
                    Search
                </button>
            </form>
            {/* Login & Cart */}
            <div className="header-icons">
                <Link href="/login" className="header-login-link">
                    <FaUser className="header-login-icon" />
                    Login
                </Link>
                <Link href="/cart" className="header-cart-link">
                    {/* Cart Icon */}
                    <FaShoppingCart className="header-cart-icon" />

                </Link>
            </div>
        </div>
    </header>
  );
};

export default Header;