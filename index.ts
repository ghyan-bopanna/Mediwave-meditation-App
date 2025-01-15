import { registerRootComponent } from 'expo';
import "./config/firebase";
import App from './App';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
  } from "firebase/auth";
  import { Alert } from "react-native";

  import { StatusBar } from "expo-status-bar";
  import { StyleSheet, Text, View } from "react-native";
  import { NavigationContainer } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import AuthStack from "./src/navigation/AuthStack";
  import "./config/firebase";
  const { Navigator, Screen } = createNativeStackNavigator();
  
  
  

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
