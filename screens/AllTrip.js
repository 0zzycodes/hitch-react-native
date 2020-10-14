import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, ScrollView } from "react-native";
import TripPreview from "../components/TripPreview";

const AllTrip = ({ trips }) => {
  const [state, setState] = useState({ treeps: [] });
  useEffect(() => {
    const treeps = [];
    trips.forEach((item) => {
      let end = new Date(`${item.date} ${item.time}`);
      let now = new Date();
      let distance = end - now;
      if (distance <= 0) {
        item.isExpired = true;
      }
      treeps.push(item);
    });

    return setState({ treeps });
  }, [trips]);

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      style={styles.container}
    >
      {trips
        .filter((item, index) => index < 10)
        .map((trip, index) =>
          trip.isExpired ? (
            <TripPreview key={index} trip={trip} expired />
          ) : (
            <TripPreview key={index} trip={trip} />
          )
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
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

export default connect(mapStateToProps, mapDispatchToProps)(AllTrip);
