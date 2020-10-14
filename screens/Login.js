import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { auth } from "../firebase/firebase.utils";
import AppButton from "../components/AppButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (event) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      error.code === "auth/wrong-password"
        ? setErrorMessage(
            "The password is invalid or the user does not have a password."
          )
        : error.code === "auth/user-not-found"
        ? setErrorMessage(
            "There is no user record corresponding to this identifier."
          )
        : setErrorMessage("Shit just got real");
    }
    // this.setState({ email: '', password: '' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.headText}>WELCOME BACK</Text>
      </View>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Email"
        placeholderTextColor="#000000"
        autoCapitalize="none"
        onChangeText={(e) => {
          setEmail(e);
        }}
        value={email}
      />

      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor="#000000"
        autoCapitalize="none"
        onChangeText={(e) => {
          setPassword(e);
        }}
        value={password}
      />
      <View style={styles.btn}>
        <AppButton
          onPress={handleSubmit}
          title="LOGIN"
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
    justifyContent: "center",
  },
  head: {
    alignItems: "center",
    marginBottom: 20,
  },
  headText: {
    fontSize: 30,
  },
  input: {
    margin: 15,
    paddingLeft: 6,
    height: 40,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  btn: {
    padding: 20,
  },
});

export default Login;
