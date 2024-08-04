// CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create a Context for the cart
const CartContext = createContext();

// Create a provider component
export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider value={{ isCartOpen, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
}
// console.log(CartContext);
return ;
// export  default function useCart() {
//   return useContext(CartContext);
// }
