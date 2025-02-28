//React Native Stateless Componant

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { STANDARD_NAVIGATION_OPTIONS } from "../utils/NavigationOptions";
import { StatusBar } from "expo-status-bar";
import OnboardingQuestions from "../screens/Onboarding/OnboardingQuestions";

const { Navigator, Screen } = createNativeStackNavigator();

const OnboardingStack = () => {
  return (
    <>
      <StatusBar style="light" />
      <Navigator id={undefined}>
        <Screen
          options={STANDARD_NAVIGATION_OPTIONS}
          name="OnboardingQuestions"
          component={OnboardingQuestions}
        />
      </Navigator>
    </>
  );
};

export default OnboardingStack;
