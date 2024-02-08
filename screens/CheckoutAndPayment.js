import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CheckoutDetails = ({ navigation }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleCheckout = () => {
        // Handle checkout logic with the user input
        // For example, you can navigate to the next screen or perform further actions
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
        justifyContent: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
});
