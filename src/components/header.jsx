import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Header.css';

function Header({ searchTerm, onSearchChange }) {
  const { getTotalItems, toggleCart } = useCart();

  const categories = ['Electronics', 'Accessories', 'Home', 'Sports'];

  return (
    <header className="header">
      <div className="header-container">

        {/* 🔝 Top Row: Logo + Cart */}
        <div className="header-top">
          <Link to="/" className="header-logo">
            <h1 className="header-title">🛒 QuickCart</h1>
            <p className="header-subtitle">
              Your one-stop shop for everything
            </p>
          </Link>

          {/* 🛒 Cart Button */}
          <button className="cart-icon-btn" onClick={toggleCart}>
            🛒
            {getTotalItems() > 0 && (
              <span className="cart-badge">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>

        {/* 🧭 Navigation */}
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>

          {categories.map(cat => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="nav-link"
            >
              {cat}
            </Link>
          ))}

          <Link to="/cart" className="nav-link">Cart</Link>
        </nav>

        {/* 🔎 Search */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>

      </div>
    </header>
  );
}

export default Header;