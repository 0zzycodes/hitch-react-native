import React from "react";
import { Image, StyleSheet, View } from "react-native";
import AppButton from "../components/AppButton";

const Landing = (props) => {
  //   const { currentUser } = useSelector((state) => state.user.currentUser);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../assets/hitchlogo.png")}
          style={{ height: 100, width: 100 }}
        />
      </View>
      <View style={styles.btns}>
        <AppButton
          onPress={() => {
            props.navigation.navigate("Login");
          }}
          title="LOGIN"
          customStyle={styles.btn}
        />
        <AppButton
          onPress={() => {
            props.navigation.navigate("Register");
          }}
          title="REGISTER"
          customStyle={styles.btn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },

  btns: {
    marginTop: "auto",
    marginBottom: 50,
    paddingHorizontal: 30,
  },
  btn: {
    backgroundColor: "#000000",
    padding: 20,
    marginBottom: 20,
  },
});

export default Landing;
