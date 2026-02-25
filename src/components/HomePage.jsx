import React from 'react';
import ProductList from './ProductList';
import { useCart } from '../context/CartContext';

function HomePage({ products, searchTerm }) {
  const { addToCart } = useCart();

  // 🔎 Filter products by search
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">

      {/* Show results only when searching */}
      {searchTerm && (
        <p className="filtered-count">
          {filteredProducts.length} product
          {filteredProducts.length !== 1 ? 's' : ''} found
        </p>
      )}

      <ProductList
        products={filteredProducts}
        onAddToCart={addToCart}
      />

      {filteredProducts.length === 0 && (
        <p className="no-products-found">
          No products found matching your search.
        </p>
      )}
    </div>
  );
}

export default HomePage;