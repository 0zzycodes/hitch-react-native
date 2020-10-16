import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { MaterialIcons } from "@expo/vector-icons";
import { editTrip } from "../redux/trip/actions";
import { StyleSheet, Text, Image, View } from "react-native";
import { updateTrip, unJoinTrip } from "../firebase/firebase.utils";
import AppButton from "../components/AppButton";
import { setCurrentChannel } from "../redux/chat/actions";

const Trip = (props) => {
  const { trip, currentUser, expired, editTrip, setCurrentChannel } = props;
  const {
    driver,
    pickUpPoint,
    destination,
    date,
    time,
    vacantSeats,
    seatCost,
    numberPlate,
    carType,
    id,
    passangers,
  } = trip;
  const [state, setState] = useState({
    numberOfPassanger: "",
    isPassanger: false,
    isSuccess: false,
    loading: false,
  });
  useEffect(() => {
    passangers &&
      passangers.filter((item, index) => {
        return item.id === currentUser.id
          ? setState({ isPassanger: true })
          : "";
      });
    //   let end = new Date(`${item.date} ${item.time}`);
    //   let now = new Date();
  }, [currentUser.id, passangers]);

  const handleJoinTrip = async (e) => {
    setState({ loading: true });
    await updateTrip(id, 1, currentUser);
    setState({ isSuccess: true, loading: false });
  };
  const handleUnjoinTrip = async (e) => {
    setState({ loading: true });
    await unJoinTrip(id, currentUser.id);
    setState({ loading: false });
  };
  const goToMessagingPage = () => {
    setCurrentChannel(id);
    props.navigation.navigate(`Chat`);
  };
  return (
    <View style={styles.container}>
      <View style={styles.carouselItemHead}>
        <Text
          style={{
            fontSize: 16,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {pickUpPoint ? pickUpPoint : "Kano"}
        </Text>
        <MaterialIcons name={"forward"} size={24} />
        <Text
          style={{
            fontSize: 16,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {destination ? destination : "Lagos"}
        </Text>
      </View>
      <View style={styles.carouselItemHead}>
        <Text>{date ? date : "2020-05-21"}</Text>
        <Text>{time ? time : "2:40"}</Text>
      </View>
      <View style={styles.driverContainer}>
        <Image
          style={styles.driverImage}
          source={{
            uri: `https://user-images.githubusercontent.com/1927295/68068778-fed0c900-fd69-11e9-95c1-29dd8e8134af.png`,
          }}
        />
        <View style={styles.driverInfo}>
          <Text style={styles.driverInfoText}>
            Driver:{" "}
            <Text style={styles.driverInfoTextInner}>
              {driver && driver.id === currentUser.id
                ? "You"
                : driver && driver.name}
            </Text>
          </Text>
          <Text style={styles.driverInfoText}>
            Age:{" "}
            <Text style={styles.driverInfoTextInner}>
              {driver && driver.age ? driver.age : "-"}
            </Text>
          </Text>
          <Text style={styles.driverInfoText}>
            Gender:{" "}
            <Text style={styles.driverInfoTextInner}>
              {driver && driver.gender ? driver.gender : "-"}
            </Text>
          </Text>
          <Text style={styles.driverInfoText}>
            Phone:{" "}
            <Text style={styles.driverInfoTextInner}>
              {driver && driver.phone ? driver.phone : "-"}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.tripInfo}>
        <View style={styles.tripInfoBox}>
          <Text style={styles.tripInfoBoxBoldText}>Seats</Text>
          <Text style={styles.tripInfoBoxLightText}>
            {vacantSeats ? vacantSeats : 0}
          </Text>
        </View>
        <View style={styles.tripInfoBox}>
          <Text style={styles.tripInfoBoxBoldText}>Car Type</Text>
          <Text style={styles.tripInfoBoxLightText}>
            {carType ? carType : "SUV"}
          </Text>
        </View>
        <View style={styles.tripInfoBox}>
          <Text style={styles.tripInfoBoxBoldText}>Price</Text>
          <Text style={styles.tripInfoBoxLightText}>
            RM{seatCost ? seatCost : 0}
          </Text>
        </View>
      </View>
      <View style={styles.tripInfo}>
        <View style={styles.tripInfoBox}>
          <Text style={styles.tripInfoBoxBoldText}>Vacant Seats</Text>
          <Text style={styles.tripInfoBoxLightText}>
            {vacantSeats ? vacantSeats : 0}
          </Text>
        </View>
        <View style={styles.tripInfoBox}>
          <Text style={styles.tripInfoBoxBoldText}>Number Plate</Text>
          <Text style={styles.tripInfoBoxLightText}>
            {numberPlate ? numberPlate : 0}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: "auto" }}>
        {state.isPassanger || driver.id === currentUser.id ? (
          <View
            style={{
              paddingHorizontal: 20,
            }}
          >
            <AppButton
              onPress={goToMessagingPage}
              title="Messaging"
              customStyle={{ marginTop: "auto" }}
              loading={state.loading}
            />
          </View>
        ) : null}
        {expired ? (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <AppButton
              onPress={() => {
                editTrip(trip);
                props.navigation.navigate("Edit Trip");
              }}
              title="Expired"
            />
          </View>
        ) : driver && driver.id === currentUser.id ? (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <AppButton
              onPress={() => {
                editTrip(trip);
                props.navigation.navigate("Edit Trip");
              }}
              title="Edit"
            />
          </View>
        ) : state.isPassanger ? (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <AppButton
              onPress={handleUnjoinTrip}
              title="Cancel"
              customStyle={{ backgroundColor: "red" }}
              loading={state.loading}
            />
          </View>
        ) : state.isSuccess ? (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <AppButton
              onPress={handleUnjoinTrip}
              title="Cancel"
              customStyle={{ backgroundColor: "red" }}
              loading={state.loading}
            />
          </View>
        ) : vacantSeats === 0 ? (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <AppButton onPress={() => {}} title="No Vacant Seat" />
          </View>
        ) : (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <AppButton onPress={handleJoinTrip} title="Join Trip" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  carouselItemHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 15,
  },
  driverContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 15,
  },
  driverImage: {
    width: 100,
    height: 100,
  },
  driverInfoText: {
    fontWeight: "bold",
    lineHeight: 25,
  },
  driverInfoTextInner: {
    fontWeight: "normal",
  },
  tripInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 15,
  },
  tripInfoBox: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: "auto",
    paddingHorizontal: 10,
    elevation: 3,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  tripInfoBoxBoldText: {
    fontWeight: "bold",
  },
  tripInfoBoxLightText: {},
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    trip: state.trip.singleTrip,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setTrips: (trip) => dispatch(setTrips(trip)),
  editTrip: (trip) => dispatch(editTrip(trip)),
  setCurrentChannel: (channelId) => dispatch(setCurrentChannel(channelId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
