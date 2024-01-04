import { StyleSheet, Linking, Platform, Text } from "react-native";

function Footer() {
  let phoneNumber = "";
  let num = "+91 9493915916";
  if (Platform.OS === "android") {
    phoneNumber = `tel:${num}`;
  } else {
    phoneNumber = `telprompt:${num}`;
  }

  return (
    <Text>
      <Text
        style={{ color: "blue" }}
        onPress={() => Linking.openURL(phoneNumber)}
      >
        {num}
      </Text>
    </Text>
  );
}

export default Footer;

const styles = StyleSheet.create({});
