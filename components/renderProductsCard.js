import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

function RenderProductCards({ item }) {
  const navigation = useNavigation();
  function pressHandler() {
    navigation.navigate("Product Details",{
        itemId : item.id,
    });
  }

  return (
    <View style={styles.MealItem}>
      <Pressable android_ripple={{ color: "#ccc" }} onPress={pressHandler}>
        <View style={styles.innerContainer}>
          <View>
            <Image style={styles.Image} source={{ uri: item.image }} />
            <Text style={styles.title}>{item.name}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <Text>Price: {item.price}</Text>
        </View>

      </Pressable>
    </View>
  );
}

export default RenderProductCards;

const styles = StyleSheet.create({
  MealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
    padding: 8,
    elevation: 3,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.36,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    borderRadius: 8,
    width: Dimensions.get("window").width - 64,
    height: 200,
    objectFit: "scale-down",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    margin: 8,
  },
  details: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    gap: 8,
  },
});
