// CartContext.js
import React, { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    // Check if the item already exists in the cart
    if (!cartItems.some((cartItem) => cartItem === item)) {
      setCartItems([...cartItems, item]);
    }
    // If you want to update the quantity or perform other actions when the item exists, you can handle it here.
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
