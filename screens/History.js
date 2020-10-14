import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TripPreview from "../components/TripPreview";
import AppButton from "../components/AppButton";

const History = (props) => {
  const { trips, currentUser } = props;
  const [state, setState] = useState({ history: [] });
  useEffect(() => {
    const history = [];
    const comingTrip = [];
    trips.forEach((item) => {
      item.passangers.forEach((sItem) => {
        if (sItem.id === currentUser.id) {
          comingTrip.push(item);
        }
      });
    });
    comingTrip.forEach((item) => {
      let end = new Date(`${item.date} ${item.time}`);
      let now = new Date();
      if (now > end) {
        history.push(item);
      }
    });
    return setState({ history });
  }, [trips]);

  return (
    <ScrollView style={styles.container}>
      {state.history.map((item, index) => (
        <TripPreview key={index} trip={item} />
      ))}
      {state.history.length === 0 && (
        <View style={{ alignItems: "center", paddingVertical: 50 }}>
          <Text style={{ fontWeight: "bold", textTransform: "uppercase" }}>
            You Have'nt taken any trip yet
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              padding: 20,
              justifyContent: "space-evenly",
            }}
          >
            <AppButton
              title={"Join Trip"}
              onPress={() => {
                props.navigation.navigate("All Trips");
              }}
            />
            <AppButton
              title={"Create Trip"}
              onPress={() => {
                props.navigation.navigate("Create Trip");
              }}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  btn: {},
});

const mapStateToProps = (state) => {
  return {
    trips: state.trip.allTrip,
    currentUser: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(History);
