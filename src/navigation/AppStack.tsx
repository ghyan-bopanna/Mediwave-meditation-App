import * as React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { STANDARD_NAVIGATION_OPTIONS } from "../utils/NavigationOptions";
import { StatusBar } from "expo-status-bar";
import AppTabs from "./AppTabs";
import PlaylistScreen from "../screens/app/PlaylistScreen";
import MusicPlayerScreen from "../screens/app/MusicPlayerScreen";

const { Navigator, Screen } = createNativeStackNavigator();

const AppStack = () => {
  return (
    <>
      <StatusBar style="light" />
      <Navigator>
        <Screen
          options={STANDARD_NAVIGATION_OPTIONS}
          name="AppTabs"
          component={AppTabs}
        />
        <Screen
          options={STANDARD_NAVIGATION_OPTIONS}
          name="PlaylistScreen"
          component={PlaylistScreen}
        />
        <Screen
          options={STANDARD_NAVIGATION_OPTIONS}
          name="MusicPlayerScreen"
          component={MusicPlayerScreen}
        />
      </Navigator>
    </>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  container: {},
});
