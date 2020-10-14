import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import LandingNavigator, { TabsNavigator } from "./navigation/Navigator";
import {
  auth,
  firestore,
  createUserProfileDocument,
} from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/actions";
import { setTrips } from "./redux/trip/actions";
// @refresh reset
const Container = ({ setCurrentUser, currentUser, setTrips }) => {
  useEffect(() => {
    auth.onAuthStateChanged(async (User) => {
      if (User) {
        const userRef = await createUserProfileDocument(User);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({ id: snapShot.id, ...snapShot.data() });
          // navigation.navigate("Home");
        });
      }
    });
    const tripRef = firestore.collection("trips").orderBy("date", "asc");
    tripRef.onSnapshot((snapshot) => {
      const tripsArr = [];
      snapshot.docs.forEach((doc) => {
        tripsArr.push(doc.data());
      });
      setTrips(tripsArr);
    });
  }, []);
  return (
    <>
      {!currentUser && <LandingNavigator />}
      {currentUser && <TabsNavigator />}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setTrips: (trip) => dispatch(setTrips(trip)),
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);

const styles = StyleSheet.create({});
