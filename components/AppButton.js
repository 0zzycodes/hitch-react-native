import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const AppButton = ({
  onPress,
  title,
  customStyle,
  icon,
  iconColor,
  textStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.appButtonContainer, ...customStyle }}
    >
      {icon && (
        <MaterialIcons
          name={icon}
          size={24}
          color={iconColor}
          style={{ ...styles.appButtonIcon }}
        />
      )}
      <Text style={{ ...styles.appButtonText, ...textStyle }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    elevation: 8,
    backgroundColor: "#000000",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonIcon: {
    marginRight: 10,
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
