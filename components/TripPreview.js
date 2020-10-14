import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { editTrip } from "../redux/trip/actions";
import { updateTrip, unJoinTrip } from "../firebase/firebase.utils";
import AppButton from "./AppButton";
import { setSingleTrip } from "../redux/trip/actions";

const TripPreview = ({
  trip,
  currentUser,
  expired,
  editTrip,
  props,
  setSingleTrip,
}) => {
  const {
    driver,
    pickUpPoint,
    destination,
    date,
    time,
    vacantSeats,
    seatCost,
    id,
    passangers,
  } = trip;
  const [state, setState] = useState({
    numberOfPassanger: "",
    isPassanger: false,
    isSuccess: false,
  });
  useEffect(() => {
    passangers &&
      passangers.filter((item, index) => {
        return item.id === currentUser.id
          ? setState({ isPassanger: true })
          : "";
      });
  }, [currentUser.id, passangers]);

  const handleJoinTrip = async (e) => {
    await updateTrip(id, 1, currentUser);
    setState({ isSuccess: true });
  };
  const handleUnjoinTrip = async (e) => {
    await unJoinTrip(id, currentUser.id);
  };
  return (
    <View style={styles.carouselItemWrapper}>
      <View style={styles.carouselItem}>
        <TouchableOpacity
          onPress={() => {
            setSingleTrip(trip);
            props.navigation.navigate("Trip");
          }}
        >
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
              <Text style={styles.tripInfoBoxBoldText}>Price</Text>
              <Text style={styles.tripInfoBoxLightText}>
                RM{seatCost ? seatCost : 0}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {expired ? (
          <View style={{ paddingHorizontal: 20 }}>
            <AppButton onPress={() => {}} title="Expired" />
          </View>
        ) : driver && driver.id === currentUser.id ? (
          <View style={{ paddingHorizontal: 20 }}>
            <AppButton
              onPress={() => {
                editTrip(trip);
                props.navigation.navigate("Edit Trip");
              }}
              title="Edit"
            />
          </View>
        ) : state.isPassanger ? (
          <View style={{ paddingHorizontal: 20 }}>
            <AppButton
              onPress={handleUnjoinTrip}
              title="Cancel"
              customStyle={{ backgroundColor: "red" }}
            />
          </View>
        ) : state.isSuccess ? (
          <View style={{ paddingHorizontal: 20 }}>
            <AppButton
              onPress={handleUnjoinTrip}
              title="Cancel"
              customStyle={{ backgroundColor: "red" }}
            />
          </View>
        ) : vacantSeats === 0 ? (
          <View style={{ paddingHorizontal: 20 }}>
            <AppButton onPress={() => {}} title="No Vacant Seat" />
          </View>
        ) : (
          <View style={{ paddingHorizontal: 20 }}>
            <AppButton onPress={handleJoinTrip} title="Join Trip" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItemWrapper: {
    height: 340,
    width: 300,
    // padding: 20,
    margin: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  carouselItem: {
    height: "100%",
    width: "100%",
    elevation: 3,
    backgroundColor: "#ffffff",
    borderRadius: 10,
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
    width: 60,
    elevation: 3,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  tripInfoBoxBoldText: {
    fontWeight: "bold",
  },
  tripInfoBoxLightText: {},

  btn: {},
});

const mapDispatchToProps = (dispatch) => ({
  setSingleTrip: (trip) => dispatch(setSingleTrip(trip)),
  editTrip: (trip) => dispatch(editTrip(trip)),
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripPreview);
