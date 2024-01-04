import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CartCard = ({ item, onRemoveItem }) => {
  // Assuming item has properties like name, price, and image
  const { name, price, image } = item;

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productPrice}>
          {"\u20B9"}
          {price}
        </Text>
      </View>
      <View>
        <Pressable onPress={() => onRemoveItem(item)}>
          <AntDesign name="delete" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
});

export default CartCard;
