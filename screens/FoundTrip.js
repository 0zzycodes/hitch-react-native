import React from "react";
import { connect } from "react-redux";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import TripPreview from "../components/TripPreview";

const FoundTrip = (props) => {
  const { foundTrip } = props;
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      style={styles.container}
    >
      {foundTrip.length === 0 ? (
        <View style={{ paddingVertical: 20 }}>
          <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
            No Trip Found
          </Text>
        </View>
      ) : (
        foundTrip.map((trip, index) => (
          <TripPreview key={index} trip={trip} props={props} />
        ))
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
    foundTrip: state.trip.foundTrip,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setTrips: (trip) => dispatch(setTrips(trip)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoundTrip);
