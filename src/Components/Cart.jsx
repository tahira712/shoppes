import React, { useState, useEffect } from "react";
import "../Style/cart.css";
import "../Style/homepage.css";
import { NavLink } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage"; 

const Cart = () => {
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(prevState => !prevState);
  };
useEffect(() => {
 setCartItems(cartItems);
},[cartItems])
  const closeCart = () => {
    if (cartItems.length === 0 || isCartOpen) { 
      setIsCartOpen(false);
      let cartoverlaycont = document.querySelector(".cart-overlay-cont");
      if (cartoverlaycont) {
        cartoverlaycont.style.display = "none";
        console.log("Cart closed");
      } else {
        console.log("Cart overlay container not found");
      }
    }
  };

  useEffect(() => {
    // Fetch cart items is now handled by the useLocalStorage hook
  }, []);

  const addItemToCart = (itemToAdd) => {
    const itemIndex = cartItems.findIndex(item => item.id === itemToAdd.id);
    let updatedItems;

    if (itemIndex > -1) {
      // If item exists, update the quantity
      updatedItems = cartItems.map((item, index) =>
        index === itemIndex
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      // If item doesn't exist, add it to the cart with quantity 1
      updatedItems = [...cartItems, { ...itemToAdd, quantity: 1 }];
    }

    setCartItems(updatedItems);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
  };

  const getUniqueCartItems = () => {
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

  const uniqueCartItems = getUniqueCartItems();

  const cartTotal = uniqueCartItems.reduce(
    (total, item) => total + parseFloat(item.price) * (parseInt(item.quantity) || 1),
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
      <div className={`cart-overlay-cont ${isCartOpen ? 'active' : 'dnone'}`}>
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
                  <NavLink to="/shop"><button className="checkout">Shop Now</button></NavLink>
                </div>
              ) : (
                <div className="cart-items-cont">
                  {uniqueCartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img
                        src="/images/close.svg"
                        alt="Remove item"
                        className="close close-small"
                        onClick={() => handleRemoveItem(item.id)}
                      />
                      <div className="image-div">
                        <img src={item.images[0]} alt={item.name} />
                      </div>
                      <div className="cart-item-info">
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                        <p><span className="qnt-gray">QNT :</span> {item.quantity || 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="cart-total">
              <p>
                <span>Total:</span>{" "}
                <span>${cartTotal.toFixed(2)}</span>
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
