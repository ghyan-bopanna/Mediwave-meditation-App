//React Native Stateless Componant

import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ComponentNameProps {}

const ComponentName = (props: ComponentNameProps) => {
  return (
    <View style={styles.container}>
      <Text>ComponentName</Text>
    </View>
  );
};

export default ComponentName;

const styles = StyleSheet.create({
  container: {},
});

