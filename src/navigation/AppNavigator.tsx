//React Native Stateless Componant

import * as React from "react";
import { StyleSheet } from "react-native";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import OnboardingStack from "./OnboardingStack";
import useHasOnboarding from "../hooks/useHasOnboarding";
import { useFonts } from "expo-font";

import visbyRegular from "./../../assets/fonts/VisbyCF-Medium.ttf";
import visbyMedium from "./../../assets/fonts/VisbyCF-DemiBold.ttf";
import visbyBold from "./../../assets/fonts/VisbyCF-Bold.ttf";
import visbyExtraBold from "./../../assets/fonts/VisbyCF-ExtraBold.ttf";

//Unable to resolve "./../../assets/fonts/VisbyCF-Regular.ttf" from "src\navigation\AppNavigator./../../
//Error

const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => {
  const isLoggedIn = useIsLoggedIn(); //hook to check if user logged in

  const hasOnboarding = useHasOnboarding(); //hook to check if user has seen onboarding

  const [loaded, error] = useFonts({
    "visby-regular": visbyRegular,
    "visby-medium": visbyMedium,
    "visby-bold": visbyBold,
    "visby-extra-bold": visbyExtraBold,
  });
  if (!loaded || error) return null;

  return (
    <Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isLoggedIn && <Screen name="AuthStack" component={AuthStack} />}
      {isLoggedIn && !hasOnboarding && (
        <Screen name="AppStack" component={OnboardingStack} />
      )}
      {isLoggedIn && hasOnboarding && (
        <Screen name="AppStack" component={AppStack} />
      )}
    </Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  container: {},
});
