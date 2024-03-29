import React, { useState, useRef, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../util/config";
import firebase from "firebase/compat/app";
import { useNavigation } from "@react-navigation/native";
import LoginContext from "../contexts/loginContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function LoginScreen() {
  const navigation = useNavigation();
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, showMessage] = useState(
    !firebaseConfig.auth
      ? { text: "To get started, provide your phone number" }
      : undefined
  );
  const [confirmError, setConfirmError] = useState(undefined);
  const [confirmInProgress, setConfirmInProgress] = useState(false);
  const [confirmResult, setConfirmResult] = useState(undefined);
  const [phoneError, setPhoneError] = useState(undefined);
  const [codeError, setCodeError] = useState(undefined);
  const { login,user } = useContext(LoginContext);

  const handleSendCode = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then((id) => {
        setVerificationId(id);
        showMessage({ text: "Verification code has been sent to your phone." });
      })
      .catch((error) => {
        setPhoneError(error.message);
        showMessage({ text: `Error: ${error.message}`, color: "red" });
      });
  };

  const handleConfirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    setConfirmError(undefined);
    setConfirmInProgress(true);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        setConfirmInProgress(false);
        setConfirmResult(result);
        navigation.navigate("checkout");
        const user = {
          phoneNumber: result.user.phoneNumber,
          // displayName: result.user.displayName,
          // email: result.user.email,
        };
        login(user);
      })
      .catch((error) => {
        setConfirmInProgress(false);
        setConfirmError(error.message);
      });
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, width: "100%" }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
      keyboardShouldPersistTaps="handled"
    >
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={styles.title}>Login</Text>
      <View style={styles.fieldView}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={(phoneNumber) => {
            setPhoneNumber(phoneNumber);
            setPhoneError(undefined);
          }}
        />
        <TouchableOpacity style={styles.sendCodeButton} onPress={handleSendCode}>
          <Text style={styles.sendCodeText}>Send Code</Text>
        </TouchableOpacity>
      </View>
      {confirmResult ? (
        <Text style={styles.success}>Signed In!</Text>
      ) : (
        <View style={styles.fieldView}>
          <TextInput
            style={styles.input}
            placeholder="Verification Code"
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            onChangeText={(verificationCode) => {
              setVerificationCode(verificationCode);
              setCodeError(undefined);
            }}
          />
          <TouchableOpacity style={styles.confirmCodeButton} onPress={handleConfirmCode}>
            <Text style={styles.confirmCodeText}>Confirm Code</Text>
          </TouchableOpacity>
        </View>
      )}
      {confirmError ? <Text style={styles.error}>{confirmError}</Text> : null}
      {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}
      {codeError ? <Text style={styles.error}>{codeError}</Text> : null}
      {message ? (
        <Text style={[styles.error, { color: message.color || "black" }]}>
          {message.text}
        </Text>
      ) : null}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  fieldView: {
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
  },
  input: {
    padding: 8,
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "black",
    width: 200,
  },
  sendCodeButton: {
    padding: 8,
    margin: 8,
    borderRadius: 8,
    backgroundColor: "cyan",
  },
  sendCodeText: {
    color: "white",
  },
  confirmCodeButton: {
    padding: 8,
    margin: 8,
    borderRadius: 8,
    backgroundColor: "cyan",
  },
  confirmCodeText: {
    color: "white",
  },
  error: {
    margin: 8,
    color: "red",
  },
  success: {
    margin: 8,
    color: "green",
  },
});
