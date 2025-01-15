//React Native Stateless Componant

import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import useAuthentication from "../../hooks/useAuthentication";
import MediButton from "../../components/Medibutton";

interface HomeScreenProps {}

const HomeScreen = (props: HomeScreenProps) => {
  const { logout } = useAuthentication();

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <MediButton onPress={logout}>Logout</MediButton>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
});
