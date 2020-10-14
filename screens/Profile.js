import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, ScrollView, Image, Text } from "react-native";
import AppButton from "../components/AppButton";
import { setCurrentUser } from "../redux/user/actions";
import { auth, firestore } from "../firebase/firebase.utils";
import TripPreview from "../components/TripPreview";

const Profile = (props) => {
  const { currentUser, setCurrentUser, trips } = props;
  const [myTrips, setMyTrips] = useState([]);
  useEffect(() => {
    const tripRef = firestore
      .collection(`trips`)
      .where("driver_id", "==", `${currentUser.id}`);
    tripRef.onSnapshot((snapshot) => {
      const trips = [];
      snapshot.docs.forEach((doc) => {
        trips.push(doc.data());
      });
      setMyTrips(trips);
    });
  }, [trips]);

  const handleSignout = () => {
    auth.signOut();
    setCurrentUser(null);
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileImageWrapper}>
        <Image
          style={styles.profileImage}
          source={
            // { uri: currentUser.profile_pic }
            // currentUser && currentUser.profile_pic
            //   ? { uri: currentUser.profile_pic }
            //   :
            {
              uri: `https://user-images.githubusercontent.com/1927295/68068778-fed0c900-fd69-11e9-95c1-29dd8e8134af.png`,
            }
          }
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <AppButton
          onPress={() => props.navigation.navigate("Edit Profile")}
          title={"Edit Profile"}
          customStyle={{ width: 150 }}
        />
        <AppButton
          onPress={handleSignout}
          title={"Logout"}
          customStyle={{ backgroundColor: "red", width: 100 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        {myTrips && (
          <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
            Trip you've created
          </Text>
        )}
        {myTrips.length === 0 && (
          <View>
            <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
              you created any trip yet
            </Text>
          </View>
        )}
        {myTrips.length === 0 && (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <AppButton
              onPress={() => {
                props.navigation.navigate("All Trips");
              }}
              title="Create Trip"
              customStyle={styles.btn}
              textStyle={{ fontSize: 14 }}
            />
            <AppButton
              onPress={() => {
                props.navigation.navigate("All Trips");
              }}
              title="Join Trip"
              customStyle={styles.btn}
              textStyle={{ fontSize: 14 }}
            />
          </View>
        )}
      </View>
      <ScrollView contentContainerStyle={{ alignItems: "center" }} style={{}}>
        {myTrips.map((item, index) => (
          <TripPreview key={index} trip={item} props={props} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  profileImageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    // elevation: 3,
    borderRadius: 10,
  },

  btn: {},
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
