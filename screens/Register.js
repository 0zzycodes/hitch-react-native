import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";
import AppButton from "../components/AppButton";
import CustomPicker from "../components/CustomPicker";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, []);

  const handleRegisterUser = async () => {
    setLoading(true);
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, {
        name,
        phone,
        age,
        gender: selectedGender,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.headText}>CREATE ACCOUNT</Text>
      </View>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Full name"
        placeholderTextColor="#000000"
        autoCapitalize="none"
        onChangeText={(e) => {
          setName(e);
        }}
        value={name}
      />
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
        placeholder="Phone"
        keyboardType="numeric"
        placeholderTextColor="#000000"
        onChangeText={(e) => {
          setPhone(e);
        }}
        value={phone}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Age"
        keyboardType="numeric"
        placeholderTextColor="#000000"
        onChangeText={(e) => {
          setAge(e);
        }}
        value={age}
      />
      <View style={{ paddingHorizontal: 10 }}>
        <CustomPicker
          selectedValue={selectedGender}
          setSelectedValue={setSelectedGender}
          prompt={"Pick Up Piont"}
          options={["Gender", "Female", "Male"]}
        />
      </View>

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
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        secureTextEntry={true}
        placeholder="Confirm password"
        placeholderTextColor="#000000"
        autoCapitalize="none"
        onChangeText={(e) => {
          setConfirmPassword(e);
        }}
        value={confirmPassword}
      />
      <View style={styles.btn}>
        <AppButton
          onPress={handleRegisterUser}
          title="REGISTER"
          customStyle={styles.btn}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingTop: 30,
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

export default Register;
