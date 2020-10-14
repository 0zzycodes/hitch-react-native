import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import Profile from "../screens/Profile";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import CreateScreen from "../screens/CreateScreen";
import AllTrip from "../screens/AllTrip";
import History from "../screens/History";
import Landing from "../screens/Landing";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

// const HeaderLeft = () => {
//   const navigation = useNavigation();

//   return (
//     <MaterialIcons
//       name="menu"
//       size={24}
//       onPress={() => {
//         navigation.openDrawer();
//       }}
//     />
//   );
// };

export function AppNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabsNavigator} />
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
      <Stack.Screen
        options={{ headerTitleStyle: { alignSelf: "center" } }}
        name="All Trips"
        component={AllTrip}
      />
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

// function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator>
//         <Drawer.Screen name="News" component={TabsNavigator} />
//         <Drawer.Screen name="About" component={AboutNavigator} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

export default LandingNavigator;
