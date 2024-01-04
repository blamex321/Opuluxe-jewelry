import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { PRODUCTS } from "../data/data";
import RenderProductCards from "../components/renderProductsCard";
import CartButton from "../components/AddToCartButton";
import { useLayoutEffect } from "react";
import CartIcon from "../components/CartIcon";

export default function ProductDetails() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <CartIcon />,

    });
  }
  , [navigation]);

  const itemId = useRoute().params?.itemId;
  const itemDetails = PRODUCTS.find((item) => item.id === itemId);

  return (
    <View>
      <RenderProductCards item={itemDetails} />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Description:</Text>
        <Text style={styles.subTitle}>{itemDetails.description}</Text>
      </View>
      <CartButton item = {itemDetails} />
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: "center",
    backgroundColor: "white",
    margin: 16,
    marginTop: 0,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.36,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 8,
  },
  subTitle: {
    fontSize: 18,
    margin: 8,
  },
});
