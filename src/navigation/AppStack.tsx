//React Native Stateless Componant

import * as React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "../screens/auth/SignupScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import { STANDARD_NAVIGATION_OPTIONS } from "../utils/NavigationOptions";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "../screens/app/HomeScreen";

const { Navigator, Screen } = createNativeStackNavigator();

const AppStack = () => {
  return (
    <>
      <StatusBar style="light" />
      <Navigator>
        <Screen
          options={STANDARD_NAVIGATION_OPTIONS}
          name="Home"
          component={HomeScreen}
        />
      </Navigator>
    </>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  container: {},
});
