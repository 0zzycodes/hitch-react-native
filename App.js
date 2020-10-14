import React from "react";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StyleSheet } from "react-native";
// import { AppNav } from "./navigation/Navigator";
import Container from "./container";

export default function App() {
  return (
    <Provider store={store}>
      <Container />
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({});
