import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import TripPreview from "../components/TripPreview";
import { firestore } from "../firebase/firebase.utils";
import AppButton from "../components/AppButton";
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
const HomeScreen = (props) => {
  const [trips, setTrips] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const tripRef = firestore.collection("trips").orderBy("date", "asc");
    tripRef.onSnapshot((snapshot) => {
      const tripsArr = [];
      snapshot.docs.forEach((doc) => {
        tripsArr.push(doc.data());
      });
      setTrips(tripsArr);
    });
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{ width: "100%", alignItems: "center" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
    >
      <View style={styles.vacantSeats}>
        <View style={{ alignItems: "center" }}></View>
        {trips
          .filter((item, index) => item.vacantSeats * 1 > 0 && index < 3)
          .map((trip, index) => (
            <TripPreview key={index} trip={trip} props={props} />
          ))}
      </View>
      <AppButton
        onPress={() => {
          props.navigation.navigate("All Trips");
        }}
        title="Load all trip"
        customStyle={styles.btn}
        textStyle={{ fontSize: 14 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    // flexDirection: "column",
    // alignItems: "center",
  },
  vacantSeats: {
    width: "100%",
    alignItems: "center",
    // padding: 20,
  },
  vacantSeatsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  btn: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    trips: state.trip.allTrip,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setTrips: (trip) => dispatch(setTrips(trip)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
