import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import EditProfile from "../screens/EditProfile";
import Profile from "../screens/Profile";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import CreateScreen from "../screens/CreateScreen";
import AllTrip from "../screens/AllTrip";
import History from "../screens/History";
import Landing from "../screens/Landing";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Trip from "../screens/Trip";
import FoundTrip from "../screens/FoundTrip";
import EditTrip from "../screens/EditTrip";
import ChatScreen from "../screens/ChatScreen";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export function LandingNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Register" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // headerLeft: () => <HeaderLeft />,
        }
      }
    >
      <Stack.Screen
        options={{ headerTitleStyle: { alignSelf: "center" } }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen options={{}} name="All Trips" component={AllTrip} />
      <Stack.Screen options={{}} name="Edit Trip" component={EditTrip} />
      <Stack.Screen name="Trip" component={Trip} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
function HistoryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // headerLeft: () => <HeaderLeft />,
        }
      }
    >
      <Stack.Screen
        options={{ headerTitleStyle: { alignSelf: "center" } }}
        name="History"
        component={History}
      />
      <Stack.Screen options={{}} name="All Trips" component={AllTrip} />
      <Stack.Screen options={{}} name="Create Trip" component={CreateScreen} />
    </Stack.Navigator>
  );
}
function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // headerLeft: () => <HeaderLeft />,
        }
      }
    >
      <Stack.Screen
        options={{ headerTitleStyle: { alignSelf: "center" } }}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen options={{}} name="All Trips" component={AllTrip} />
      <Stack.Screen options={{}} name="Create Trip" component={CreateScreen} />
      <Stack.Screen options={{}} name="Edit Trip" component={EditTrip} />
      <Stack.Screen options={{}} name="Edit Profile" component={EditProfile} />
      <Stack.Screen name="Trip" component={Trip} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
function SearchNavigator() {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // headerLeft: () => <HeaderLeft />,
        }
      }
    >
      <Stack.Screen
        options={{ headerTitleStyle: { alignSelf: "center" } }}
        name="Find Trip"
        component={SearchScreen}
      />
      <Stack.Screen options={{}} name="Found Trip" component={FoundTrip} />
      <Stack.Screen options={{}} name="Edit Trip" component={EditTrip} />
      <Stack.Screen name="Trip" component={Trip} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
function CreateNavigator() {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // headerLeft: () => <HeaderLeft />,
        }
      }
    >
      <Stack.Screen
        options={{ headerTitleStyle: { alignSelf: "center" } }}
        name="Create Trip"
        component={CreateScreen}
      />
    </Stack.Navigator>
  );
}

export function TabsNavigator() {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        // tabBarOptions={{ showLabel: false }}
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let iconName;
            switch (route.name) {
              case "Home":
                iconName = "home";
                break;
              case "History":
                iconName = "history";
                break;
              case "Search":
                iconName = "search";
                break;
              case "Create":
                iconName = "add";
                break;
              case "Profile":
                iconName = "account-circle";
                break;

              default:
                break;
            }

            return (
              <MaterialIcons
                name={iconName}
                size={iconName === "add" ? 40 : 24}
              />
            );
          },
        })}
      >
        <Tabs.Screen name="Home" component={HomeNavigator} />
        <Tabs.Screen name="Search" component={SearchNavigator} />
        <Tabs.Screen name="Create" component={CreateNavigator} />
        <Tabs.Screen name="History" component={HistoryNavigator} />
        <Tabs.Screen name="Profile" component={ProfileNavigator} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

export default LandingNavigator;
