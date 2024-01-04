import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import CartContext from "../contexts/CartContext";
import { Entypo } from '@expo/vector-icons';

function CartIcon() {
  const { cartItems } = useContext(CartContext);

  const navigation = useNavigation();
  function goToCart() {
    navigation.navigate("Cart");
  }

  return (
    <Pressable android_ripple={{ color: "#ccc" }} onPress={goToCart}>
      {cartItems.length > 0 ? (
        <Entypo name="shopping-cart" size={24} color="black" />
      ) : (
        <AntDesign name="shoppingcart" size={24} color="grey" />
      )}
    </Pressable>
  );
}

export default CartIcon;
