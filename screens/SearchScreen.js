import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppButton from "../components/AppButton";
import CustomPicker from "../components/CustomPicker";
import { firestore } from "../firebase/firebase.utils";
import { setFoundTrip } from "../redux/trip/actions";

const SearchScreen = (props) => {
  const [selectedPickUpPoint, setSelectedPickUpPoint] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const toggleTimePicker = () => {
    setTimePickerVisibility(!isTimePickerVisible);
  };

  const handleConfirmDate = (date) => {
    const timeString = new Date(date);
    const year = timeString.getFullYear();
    const month = timeString.getMonth();
    const day = timeString.getDay();
    const newDate = `${year}-${month}-${day}`;

    setDate(newDate);
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const handleConfirmTime = (time) => {
    const timeString = new Date(time);
    const hours = timeString.getHours();
    const minutes = timeString.getMinutes();
    const newTime = `${hours}:${minutes}`;
    setTime(newTime);
    setTimePickerVisibility(!isTimePickerVisible);
  };
  const handleFindTrip = async () => {
    setLoading(true);
    try {
      const tripUrl =
        selectedPickUpPoint !== "" &&
        selectedDestination !== "" &&
        date !== "" &&
        time !== ""
          ? firestore
              .collection(`trips`)
              .where(
                "pickUpPoint",
                "==",
                `${selectedPickUpPoint.toLowerCase()}`
              )
              .where(
                "destination",
                "==",
                `${selectedDestination.toLowerCase()}`
              )
              .where("date", "==", `${date}`)
              .where("time", "==", `${time}`)
          : selectedPickUpPoint !== "" && selectedDestination !== ""
          ? firestore
              .collection(`trips`)
              .where(
                "pickUpPoint",
                "==",
                `${selectedPickUpPoint.toLowerCase()}`
              )
              .where(
                "destination",
                "==",
                `${selectedDestination.toLowerCase()}`
              )
          : selectedDestination !== "" && date !== ""
          ? firestore
              .collection(`trips`)
              .where(
                "destination",
                "==",
                `${selectedDestination.toLowerCase()}`
              )
              .where("date", "==", `${date}`)
          : selectedDestination !== "" && time !== ""
          ? firestore
              .collection(`trips`)
              .where(
                "destination",
                "==",
                `${selectedDestination.toLowerCase()}`
              )
              .where("time", "==", `${time}`)
          : date !== "" && time !== ""
          ? firestore
              .collection(`trips`)
              .where("date", "==", `${date}`)
              .where("time", "==", `${time}`)
          : selectedDestination !== ""
          ? firestore
              .collection(`trips`)
              .where(
                "destination",
                "==",
                `${selectedDestination.toLowerCase()}`
              )
          : date !== ""
          ? firestore.collection(`trips`).where("date", "==", `${date}`)
          : firestore.collection(`trips`).where("time", "==", `${time}`);
      const tripRef = tripUrl;
      tripRef.onSnapshot((snapshot) => {
        const trips = [];
        snapshot.docs.forEach((doc) => {
          trips.push(doc.data());
        });
        props.setFoundTrip(trips);
      });
      setLoading(false);
      props.navigation.navigate("Found Trip");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <View style={{ paddingHorizontal: 9 }}>
          <Text>Pick Up Point</Text>
        </View>
        <CustomPicker
          selectedValue={selectedPickUpPoint}
          setSelectedValue={setSelectedPickUpPoint}
          prompt={"Pick Up Piont"}
          options={[
            "Alor Setar",
            "Batu Pahat",
            "Butterworth",
            "Cukai",
            "George Town",
            "Johor Bahru",
            "Ipoh",
            "Kampong Baharu",
            "Kampung Lemal",
            "Kampung Sungai Pasir",
            "Kangar",
            "Ketereh",
            "Klang",
            "Kulang",
            "Kota Bharu",
            "Kota Kinabalu",
            "Kuala Lipis",
            "Kuala Lumpur",
            "Kuala Terangganu",
            "Kuantan",
            "Kuching",
            "Melaka",
            "Lahad Datu",
            "Miri",
            "Muar",
            "Pasri Mas",
            "Pulai Chondong",
            "Raub",
            "Sandakan",
            "Seramban",
            "Seramban Garden",
            "Shah Alam",
            "Taiping",
            "Tawau",
            "Teluk intan",
            "Tumpat",
            "Victoria",
          ]}
        />
      </View>
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <View style={{ paddingHorizontal: 9 }}>
          <Text>Destination</Text>
        </View>
        <CustomPicker
          selectedValue={selectedDestination}
          setSelectedValue={setSelectedDestination}
          prompt={"Destination"}
          options={[
            "Alor Setar",
            "Batu Pahat",
            "Butterworth",
            "Cukai",
            "George Town",
            "Johor Bahru",
            "Ipoh",
            "Kampong Baharu",
            "Kampung Lemal",
            "Kampung Sungai Pasir",
            "Kangar",
            "Ketereh",
            "Klang",
            "Kulang",
            "Kota Bharu",
            "Kota Kinabalu",
            "Kuala Lipis",
            "Kuala Lumpur",
            "Kuala Terangganu",
            "Kuantan",
            "Kuching",
            "Melaka",
            "Lahad Datu",
            "Miri",
            "Muar",
            "Pasri Mas",
            "Pulai Chondong",
            "Raub",
            "Sandakan",
            "Seramban",
            "Seramban Garden",
            "Shah Alam",
            "Taiping",
            "Tawau",
            "Teluk intan",
            "Tumpat",
            "Victoria",
          ]}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={toggleDatePicker}
          style={{ ...styles.appButtonContainer }}
        >
          <Text style={styles.appButtonText}>Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleTimePicker}
          style={{ ...styles.appButtonContainer }}
        >
          <Text style={styles.appButtonText}>Time</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={toggleDatePicker}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={toggleTimePicker}
      />
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <AppButton onPress={handleFindTrip} title={"Find"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingVertical: 20,
  },
  timePickerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#000000",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    trips: state.trip.allTrip,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setFoundTrip: (trip) => dispatch(setFoundTrip(trip)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
