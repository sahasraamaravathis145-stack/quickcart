import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CartPage.css';

function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-page">
          <p>Your cart is empty</p>
          <Link to="/">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-page-content">

          {cart.map(item => (
            <div key={item.id} className="cart-item">

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>

              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>

            </div>
          ))}

          <div className="cart-total">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          </div>

          <div className="cart-buttons">
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
            <button className="checkout-btn">Checkout</button>
          </div>

        </div>
      )}
    </div>
  );
}

export default CartPage;