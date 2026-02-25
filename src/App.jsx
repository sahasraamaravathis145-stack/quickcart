import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import CartPage from './components/CartPage';
import CartSidebar from './components/CartSidebar';

import { products } from './data/products';
import './styles/App.css';

function App() {
  // 🛒 Cart items state
  const [cart, setCart] = useState([]);

  // 📂 Cart visibility state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 🔍 Search state
  const [searchTerm, setSearchTerm] = useState('');

  // ➕ Add to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // ❌ Remove item
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // 🔢 Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  // 🔁 Toggle cart sidebar
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // 🧮 Total items count
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <BrowserRouter>
      <div className="app">

        <Header
          cartItemCount={getTotalItems()}
          onCartClick={toggleCart}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <main className="main-content">
          <Routes>

            {/* 🏠 Home Page */}
            <Route
              path="/"
              element={
                <HomePage
                  products={products}
                  onAddToCart={addToCart}
                  searchTerm={searchTerm}
                />
              }
            />

            {/* 📂 Category Page */}
            <Route
              path="/category/:category"
              element={
                <CategoryPage
                  products={products}
                  onAddToCart={addToCart}
                />
              }
            />

            {/* 🛒 Cart Page */}
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeFromCart}
                />
              }
            />

          </Routes>
        </main>

        <CartSidebar
          isOpen={isCartOpen}
          onClose={toggleCart}
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />

      </div>
    </BrowserRouter>
  );
}

export default App;