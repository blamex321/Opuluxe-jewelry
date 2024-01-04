// CartContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cartItems from local storage on component mount
  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem("cartItems");
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems));
        }
      } catch (error) {
        console.error("Error loading cart items from local storage:", error);
      }
    };

    loadCartItems();
  }, []);

  // Save cartItems to local storage whenever it changes
  useEffect(() => {
    const saveCartItems = async () => {
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving cart items to local storage:", error);
      }
    };

    saveCartItems();
  }, [cartItems]);

  const addToCart = (item) => {
    // Check if the item already exists in the cart
    if (!cartItems.some((cartItem) => cartItem === item)) {
      setCartItems([...cartItems, item]);
    }
    // If you want to update the quantity or perform other actions when the item exists, you can handle it here.
  };

  const removeFromCart = (item) => {
    // Filter out the item to be removed
    const updatedCartItems = cartItems.filter((cartItem) => cartItem !== item);
    setCartItems(updatedCartItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
