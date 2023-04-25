import React, { useEffect, useState } from "react";
//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "../screens/IndexScreen";
import Information from "../screens/Information";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "../screens/LoginScreen";
import IndexStack from "./IndexStack";
import { Icon } from "react-native-elements";


const Tab = createBottomTabNavigator();
export default function AppNavigation() {
  const [session, setSession] = useState(null);

  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     setSession(user ? true : false);
  //   });
  // }, []);

  return session ? (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#00E9ED",
        tabBarInactiveTintColor: "#337AFF",
        tabBarIcon: ({ color, size }) => showIcons(route, color, size),
      })}
    >
      <Tab.Screen
        name="index"
        component={IndexStack}
        options={{ title: "Inicio" }}
      />
    </Tab.Navigator>
  ) : (
    <IndexStack />
  );
}
function showIcons(route, color, size) {
  let icono;
  if (route.name === "index") {
    icono = "home-circle-outline";
  }
  if (route.name === "details") {
    icono = "details";
  }
  if (route.name === "profile") {
    icono = "account-outline";
  }
  return (
    <Icon type="material-community" name={icono} color={color} size={size} />
  );
}