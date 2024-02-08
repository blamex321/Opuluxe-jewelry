import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import CartContext from "../contexts/CartContext";
import { useNavigation } from "@react-navigation/native";

function CartButton({ item }) {
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);
  const handlePress = () => {
    addToCart(item);
    navigation.navigate("Cart");
  };
  return (
    <View style={styles.buttonView}>
      <Pressable android_ripple={{ color: "#ccc" }} onPress={handlePress}>
        <Text> Add To Cart</Text>
      </Pressable>
    </View>
  );
}

export default CartButton;

const styles = StyleSheet.create({
  buttonView: {
    alignItems: "center",
    margin: 16,
    padding: 8,
    backgroundColor: "cyan",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "black",
    shadowOpacity: 0.36,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
});
