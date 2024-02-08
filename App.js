import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Categories from "./screens/categories";
import Products from "./screens/products";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart";
import { CartProvider } from "./contexts/CartContext";
import LoginScreen from "./screens/LoginScreen";
import { LoginProvider } from "./contexts/loginContext";
import CheckoutDetails from "./screens/CheckoutAndPayment";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <LoginProvider>
          <CartProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Categories" component={Categories} />
                <Stack.Screen name="Products" component={Products} />
                <Stack.Screen
                  name="Product Details"
                  component={ProductDetails}
                />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="checkout" component={CheckoutDetails} />
              </Stack.Navigator>
            </NavigationContainer>
          </CartProvider>
        </LoginProvider>
      </View>
      {/* <View style={styles.footer}>
        <Footer />
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    height: 50,
  },
});
