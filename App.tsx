import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./src/navigation/AuthStack";
import "./config/firebase";
import useIsLoggedIn from "./src/hooks/useIsLoggedIn";
import AppStack from "./src/navigation/AppStack";

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
  const isLoggedIn = useIsLoggedIn(); //hook to check if user logged in

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Navigator>
        {!isLoggedIn && (
          <Screen
            options={{ headerShown: false }}
            name="AuthStack"
            component={AuthStack}
          />
        )}
        {isLoggedIn && <Screen name="AppStack" component={AppStack} />}
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
