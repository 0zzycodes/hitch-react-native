import React, {
  useState,
  // useEffect
} from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  //   Image,
  View,
  //   Platform,
} from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import Constants from "expo-constants";
// import firebase from "../firebase/firebase.utils";
import { updateProfileData } from "../firebase/firebase.utils";
import { connect } from "react-redux";
import AppButton from "../components/AppButton";
import CustomPicker from "../components/CustomPicker";

const EditProfile = (props) => {
  const { currentUser } = props;
  //   const [image, setImage] = useState(null);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  //   const [profilePic, setProfilePic] = useState(
  //     currentUser.profilePic ? currentUser.profilePic : ""
  //   );
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState(currentUser.phone);
  const [age, setAge] = useState(currentUser.age);
  const [selectedGender, setSelectedGender] = useState("");

  //   useEffect(() => {
  //     (async () => {
  //       if (Platform.OS !== "web") {
  //         const {
  //           status,
  //         } = await ImagePicker.requestCameraRollPermissionsAsync();
  //         if (status !== "granted") {
  //           alert("Sorry, we need camera roll permissions to make this work!");
  //         }
  //       }
  //     })();
  //   }, []);
  //   const pickImage = async () => {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       allowsEditing: true,
  //       aspect: [5, 5],
  //       quality: 1,
  //     });
  //     if (!result.cancelled) {
  //       //   const response = await fetch(result.uri);
  //       //   const blob = await response.blob();
  //       setImage(result.uri);
  //       //   const storageRef = firebase
  //       //     .storage()
  //       //     .ref(`users/${currentUser.id}/profile-pic/${blob}`);
  //       //   const uploadTask = storageRef.put(blob);
  //       //   uploadTask.on(
  //       //     "state_changed",
  //       //     (snapshot) => {
  //       //       switch (snapshot.state) {
  //       //         case firebase.storage.TaskState.PAUSED:
  //       //           console.log("Upload is paused");
  //       //           break;
  //       //         case firebase.storage.TaskState.RUNNING:
  //       //           console.log("Upload is running");
  //       //           break;
  //       //       }
  //       //     },
  //       //     (error) => {
  //       //       console.log(error);
  //       //     },
  //       //     () => {
  //       //       uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //       //         setProfilePic({ profile_pic: downloadURL });
  //       //       });
  //       //     }
  //       //   );
  //     }
  //   };
  const handleSave = async () => {
    const incomingData = {
      name,
      //   profile_pic: profilePic,
      location,
      email,
      phone,
      age,
      gender: selectedGender,
    };
    const success = await updateProfileData(currentUser.id, incomingData);
    success && props.navigation.navigate("Profile");
  };
  return (
    <ScrollView>
      <View style={styles.head}>
        <View style={styles.btn}>
          {/* <AppButton
            onPress={pickImage}
            title="Image"
            iconColor={"#ffffff"}
            icon={"link"}
            customStyle={styles.btn}
          /> */}
        </View>
        <View style={styles.btn}>
          <AppButton
            onPress={handleSave}
            title="Save"
            customStyle={styles.btn}
          />
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 150, height: 150, borderRadius: 10 }}
          />
        )} */}
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
        placeholder="Location"
        placeholderTextColor="#000000"
        onChangeText={(e) => {
          setLocation(e);
        }}
        value={location}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingVertical: 30,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
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
    paddingHorizontal: 20,
    marginLeft: "auto",
  },
});

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
