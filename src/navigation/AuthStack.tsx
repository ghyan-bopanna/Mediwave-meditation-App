//React Native Stateless Componant

import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "../screens/auth/SignupScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import { STANDARD_NAVIGATION_OPTIONS } from "../utils/NavigationOptions";
import { StatusBar } from "expo-status-bar";

const { Navigator, Screen } = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <>
      <StatusBar style="light" />
      <Navigator>
        <Screen
          options={STANDARD_NAVIGATION_OPTIONS}
          name="Signup"
          component={SignupScreen}
        />
        <Screen
          options={STANDARD_NAVIGATION_OPTIONS}
          name="Login"
          component={LoginScreen}
        />
      </Navigator>
    </>
  );
};

export default AuthStack;

const styles = StyleSheet.create({
  container: {},
});
