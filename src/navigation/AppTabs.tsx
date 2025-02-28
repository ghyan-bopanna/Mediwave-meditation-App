import * as React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "../screens/app/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import homeIcon from "./../../assets/images/home-icon.png";
import libraryIcon from "./../../assets/images/library-icon.png";
import journalIcon from "./../../assets/images/journal-icon.png";
import profileIcon from "./../../assets/images/profile-icon.png";
import COLORS from "../utils/COLORS";
import TabBarIcon from "../components/TabBarIcon";
import LibraryScreen from "../screens/app/LibraryScreen";
import JournalScreen from "../screens/app/JournalScreen";
import ProfileScreen from "../screens/app/ProfileScreen";
import PlaylistScreen from "../screens/app/PlaylistScreen";
import JournalEntriesScreen from "../screens/app/JournalEntriesScreen";

const { Navigator, Screen } = createBottomTabNavigator();
const LibraryStack = createNativeStackNavigator();
const JournalStack = createNativeStackNavigator();

const LibraryStackScreen = () => (
  <LibraryStack.Navigator>
    <LibraryStack.Screen
      name="LibraryScreen"
      component={LibraryScreen}
      options={{ headerShown: false }}
    />
    <LibraryStack.Screen
      name="PlaylistScreen"
      component={PlaylistScreen}
      options={{ headerShown: false }}
    />
  </LibraryStack.Navigator>
);

const JournalStackScreen = () => (
  <JournalStack.Navigator>
    <JournalStack.Screen
      name="JournalScreen"
      component={JournalScreen}
      options={{ headerShown: false }}
    />
    <JournalStack.Screen
      name="JournalEntriesScreen"
      component={JournalEntriesScreen}
      options={{ headerShown: false }}
    />
  </JournalStack.Navigator>
);

const AppTabs = () => (
  <>
    <StatusBar style="light" />
    <Navigator
      id={undefined}
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={homeIcon}
              size={{ width: 27, height: 23 }}
            />
          ),
        }}
      />
      <Screen
        name="Library"
        component={LibraryStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={libraryIcon}
              size={{ width: 23, height: 23 }}
            />
          ),
        }}
      />
      <Screen
        name="Journal"
        component={JournalStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={journalIcon}
              size={{ width: 23, height: 23 }}
            />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={profileIcon}
              size={{ width: 19, height: 23 }}
            />
          ),
        }}
      />
    </Navigator>
  </>
);

export default AppTabs;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: COLORS.BACKGROUND_COLOR,
    height: 90,
    paddingTop: 10,
    paddingHorizontal: 30,
  },
  sceneContainer: {
    backgroundColor: COLORS.BACKGROUND_COLOR,
    flex: 1,
  },
});
