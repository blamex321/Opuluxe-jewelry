import { View, Text, FlatList, Button, StyleSheet } from "react-native";
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

  const goToLoginPage = () => {
    navigation.navigate("login");
  }
  

  return (
    <>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartCard item={item} onRemoveItem={handleRemoveItem} />
        )}
      />
      <Text onPress={goToLoginPage} style={styles.loginButton}>
        checkout and login
      </Text>
    </>
  );
}

export default Cart;

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "blue",
    color: "white",
    padding: 20,
    textAlign: "center",
  },
})
