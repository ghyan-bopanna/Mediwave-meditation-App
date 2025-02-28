import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "./config/firebase";
import ProfileProvider from "./src/context/ProfileProvider";
import AppNavigator from "./src/navigation/AppNavigator";
import { MusicPlayerProvider } from "./src/context/MusicPlayerProvider";

export default function App() {
  return (
    <ProfileProvider>
      <MusicPlayerProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </MusicPlayerProvider>
    </ProfileProvider>
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
