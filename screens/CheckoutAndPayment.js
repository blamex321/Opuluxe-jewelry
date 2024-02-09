import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet,Alert } from "react-native";
import LoginContext from "../contexts/loginContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CartContext from "../contexts/CartContext";

const CheckoutDetails = ({ navigation }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const { user } = useContext(LoginContext);
  const { cartItems } = useContext(CartContext);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

  const handleCheckout = () => {
    const userData = {
      name,
      address,
      phoneNumber,
    };
  
    // Save the user data to local storage
    AsyncStorage.setItem("user", JSON.stringify(userData));
  
    axios.post("http://localhost:3000/", {
      userPhoneNumber: userData.phoneNumber,
      userName: userData.name,
      userAddress: userData.address,
      cartItems: cartItems
    }).then((response) => {
      console.log(response);
  
      // Check if the response status is 200
      if (response.status === 200) {
        // Show checkout successful message (you can use an alert, toast, or a custom component)
        alert("Checkout successful!");
  
        // Redirect to the home page using React Navigation
        navigation.navigate("Categories");
      } else {
        // Handle other response statuses as needed
        console.error("Checkout failed. Status: ", response.status);
        // You may want to show an error message to the user
      }
    }).catch((error) => {
      // Handle the error from the axios request
      console.error("Error during checkout:", error);
      // You may want to show an error message to the user
    });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Checkout Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="numeric"
      />
      {/* Add more TextInput components for additional user input as needed */}
      <Button title="Proceed to Checkout" onPress={handleCheckout} />
    </View>
  );
};

export default CheckoutDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});
