import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { createTrip } from "../firebase/firebase.utils";
import firebase from "../firebase/firebase.utils";
import AppButton from "../components/AppButton";
import CustomPicker from "../components/CustomPicker";
import { GenerateId } from "../utils/id-generator";
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
const CreateScreen = (props) => {
  const { currentUser } = props;
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedPickUpPoint, setSelectedPickUpPoint] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [carType, setCarType] = useState("");
  const [vacantSeats, setVacantSeats] = useState(0);
  const [seatCost, setSeatCost] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);
  const addChannel = async (channelId, channelName, channelDetails) => {
    const { id, name } = currentUser;
    const newChannel = {
      id: channelId,
      name: channelName,
      details: channelDetails,
      createdBy: {
        id,
        name: name,
      },
    };
    await firebase
      .database()
      .ref("channels")
      .child(channelId)
      .update(newChannel)
      .then(() => {
        console.log("channel added");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCreateTrip = async () => {
    setLoading(true);
    const pushId = GenerateId();
    try {
      const tripData = {
        id: pushId,
        driver: {
          id: currentUser.id,
          name: currentUser.name,
          phone: currentUser.phone,
          email: currentUser.email,
          age: currentUser.age,
          gender: currentUser.gender,
          profile_pic: currentUser.profile_pic ? currentUser.profile_pic : "",
        },
        driver_id: currentUser.id,
        pickUpPoint: selectedPickUpPoint.toLocaleLowerCase(),
        destination: selectedDestination.toLowerCase(),
        date,
        numberPlate,
        seatCost: seatCost * 1,
        description,
        time,
        vacantSeats: vacantSeats * 1,
        carType,
        passangers: [],
      };
      if (
        selectedPickUpPoint === "" ||
        selectedDestination === "" ||
        date === "" ||
        time === "" ||
        carType === "" ||
        numberPlate === "" ||
        seatCost === "" ||
        vacantSeats === "" ||
        description === ""
      ) {
        setErrorMessage("All fields are required");
        return;
      }
      await createTrip(tripData, pushId);
      const channelName = `${selectedPickUpPoint} to ${selectedDestination}`;
      const channelDetails = `Trip from ${selectedPickUpPoint} to ${selectedDestination}`;
      await addChannel(pushId, channelName, channelDetails);
      setTime("");
      setSelectedPickUpPoint("");
      setSelectedDestination("");
      setNumberPlate("");
      setCarType("");
      setVacantSeats(0);
      setSeatCost(0);
      setDescription("");
      setLoading(false);
      props.navigation.goBack();
    } catch (error) {
      setErrorMessage("Failed Try Again");
      setLoading(false);
    }
  };

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

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.container}
    >
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
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Car Type"
        placeholderTextColor="#000000"
        autoCapitalize="none"
        onChangeText={(e) => {
          setCarType(e);
        }}
        value={carType}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Number Plate"
        placeholderTextColor="#000000"
        onChangeText={(e) => {
          setNumberPlate(e);
        }}
        value={numberPlate}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="No Of Seats"
        keyboardType="numeric"
        placeholderTextColor="#000000"
        onChangeText={(e) => {
          setVacantSeats(e);
        }}
        value={vacantSeats}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Seat Cost"
        keyboardType="numeric"
        placeholderTextColor="#000000"
        onChangeText={(e) => {
          setSeatCost(e);
        }}
        value={seatCost}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Description"
        placeholderTextColor="#000000"
        autoCapitalize="none"
        onChangeText={(e) => {
          setDescription(e);
        }}
        value={description}
      />

      <View style={styles.btn}>
        <AppButton
          onPress={handleCreateTrip}
          title="Create"
          customStyle={styles.btn}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  head: {
    alignItems: "center",
    marginBottom: 20,
  },
  headText: {
    fontSize: 30,
  },
  input: {
    margin: 15,
    paddingLeft: 6,
    height: 40,
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
  },
  timePickerContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
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
  btn: {
    padding: 20,
  },
});
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(CreateScreen);
