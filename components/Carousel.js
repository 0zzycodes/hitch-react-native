import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AppButton from "./AppButton";
import TripPreview from "./TripPreview";

const Carousel = ({ trips }) => {
  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{
        ...styles.scrollView,
        width: 300 * trips.length,
      }}
      showsHorizontalScrollIndicator={true}
      scrollEventThrottle={200}
      pagingEnabled
      decelerationRate="fast"
    >
      {trips.map((item, index) => (
        <TripPreview trip={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  vacantSeatsText: {
    fontSize: 18,
  },
  scrollView: {},
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    trips: state.trip.allTrip,
  };
};

export default connect(mapStateToProps)(Carousel);
