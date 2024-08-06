import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeItem } from '../redux/cartSlice';
import "../Style/cart.css";
import "../Style/homepage.css";

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const [uniqueCartItems, setUniqueCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const computeUniqueCartItems = () => {
      const itemMap = new Map();
      cartItems.forEach(item => {
        if (itemMap.has(item.id)) {
          const existingItem = itemMap.get(item.id);
          existingItem.quantity += item.quantity || 1;
        } else {
          itemMap.set(item.id, { ...item });
        }
      });
      return Array.from(itemMap.values());
    };

    setUniqueCartItems(computeUniqueCartItems());
  }, [cartItems]);

  const toggleCart = () => setIsCartOpen(prev => !prev);

  const closeCart = () => {
    if (isCartOpen) {
      setIsCartOpen(false);
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const cartTotal = uniqueCartItems.reduce(
    (total, item) => total + parseFloat(item.price) * (item.quantity || 1),
    0
  );

  return (
    <>
      <div className="shop-circle" onClick={toggleCart}>
        <img src="/images/shop.svg" alt="Shop" />
      </div>
      <div className="shop-circle-black" onClick={toggleCart}>
        <img src="/images/shop-black.svg" alt="Shop Black" />
      </div>
      <div className={`cart-overlay-cont ${isCartOpen ? "active" : "dnone"}`}>
        <div className="cart-overlay">
          <div className="cart">
            <img
              src="/images/close.svg"
              alt="Close"
              className="close"
              onClick={closeCart}
            />
            <div className="cart-items">
              <h1 className="title-cart">Shopping Cart</h1>
              {cartItems.length === 0 ? (
                <div className="no-product">
                  <img src="/images/no-product.png" alt="No products" />
                  <NavLink to="/shop">
                    <button className="checkout">Shop Now</button>
                  </NavLink>
                </div>
              ) : (
                <div className="cart-items-cont">
                  {uniqueCartItems.map(item => (
                    <div key={item.id} className="cart-item">
                      <img
                        src="/images/close.svg"
                        alt="Remove item"
                        className="close close-small"
                        onClick={() => handleRemoveItem(item.id)}
                      />
                      <div className="image-div">
                        {item.images?.[0] ? (
                          <img src={item.images[0]} alt={item.name} />
                        ) : (
                          <img src="/images/no-image.png" alt="No image" />
                        )}
                      </div>
                      <div className="cart-item-info">
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                        <p>
                          <span className="qnt-gray">QNT:</span> {item.quantity || 1}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="cart-total">
              <p>
                <span>Total:</span> <span>${cartTotal.toFixed(2)}</span>
              </p>
              <div className="cart-buttons">
                <button className="checkout">Checkout</button>
                <button className="view-cart">View Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
