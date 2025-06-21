import React , {useState} from 'react';
import Link from 'next/link';
import './Header.css'; // If using CSS modules, see note below
import { useRouter } from 'next/router';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Header: React.FC = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(search.trim()) {
        router.push(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategory(e.target.value);
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
                <Link href="/login" className="header-login-link">
                    <FaUser className="header-login-icon" />
                    Login
                </Link>
                <Link href="/cart" className="header-cart-link">
                    {/* Cart Icon */}
                    <FaShoppingCart className="header-cart-icon" />
                    Cart
                </Link>
            </div>
        </div>
    </header>
  );
};

export default Header;