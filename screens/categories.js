import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { CATEGORIES } from "../data/data";
import { useEffect } from "react";
import { fetchProducts } from "../data/data";

function Categories({ navigation }) {
  useEffect(() => {
    fetchProducts();
  }
  , []);
  
  const renderCategory = (itemData) => {
    function pressHandler() {


      navigation.navigate("Products", {
        categoryId: itemData.item.id,
      });
    }

    return (
      <View style={styles.gridItem}>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          x
          onPress={pressHandler}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{itemData.item.title}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default Categories;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    backgroundColor: "#ccc",
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
