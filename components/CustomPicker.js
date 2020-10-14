import React, { useState } from "react";
import { Picker } from "react-native";

const CustomPicker = ({
  prompt,
  style,
  options,
  selectedValue,
  setSelectedValue,
}) => {
  return (
    <Picker
      prompt={prompt}
      selectedValue={selectedValue}
      style={{
        height: 50,
        width: "100%",
        borderBottomColor: "#000000",
        borderBottomWidth: 2,
        borderColor: "black",
        borderWidth: 3,
        ...style,
      }}
      onValueChange={(itemValue, itemIndex) => {
        console.log("====================================");
        console.log(itemValue);
        console.log("====================================");
        setSelectedValue(itemValue);
      }}
    >
      {options.map((item, index) => (
        <Picker.Item key={index} label={item} value={item.toLowerCase()} />
      ))}
    </Picker>
  );
};

export default CustomPicker;
