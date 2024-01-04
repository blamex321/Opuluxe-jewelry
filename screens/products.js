import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { CATEGORIES, PRODUCTS } from "../data/data";
import { useLayoutEffect } from "react";
import RenderProductCards from "../components/renderProductsCard";
import CartIcon from "../components/CartIcon";

function ProductsOverview() {
  const categoryId = useRoute().params?.categoryId;
  const categoryName = CATEGORIES.find((cat) => cat.id === categoryId).title;

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryName,
      headerRight: () => <CartIcon />,
    });
  }, [navigation, categoryName]);

  const products = PRODUCTS.filter(
    (product) => product.categoryIds.indexOf(categoryId) >= 0
  );

  function renderProduct({item}) {
    return <RenderProductCards item={item} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default ProductsOverview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
