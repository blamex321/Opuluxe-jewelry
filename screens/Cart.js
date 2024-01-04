import { View, Text, FlatList } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import CartContext from "../contexts/CartContext";
import CartIcon from "../components/CartIcon";
import CartCard from "../components/CartCard";

function Cart({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CartIcon />,
    });
  }, [navigation]);

  const { cartItems, removeFromCart } = useContext(CartContext);

  const handleRemoveItem = (item) => {
    removeFromCart(item);
  };

  return (
    <FlatList
      data={cartItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CartCard item={item} onRemoveItem={handleRemoveItem} />
      )}
    />
  );
}

export default Cart;
