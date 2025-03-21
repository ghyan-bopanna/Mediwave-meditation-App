//React Native Stateless Componant

import * as React from "react";
import { View, Text, StyleSheet, Image, ImageProps } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/CONST_LAYOUT";

interface BackgroundScreenWrapperProps {
  image: ImageProps;
  children: React.ReactNode;
}

const BackgroundScreenWrapper = ({
  image,
  children,
}: BackgroundScreenWrapperProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

export default BackgroundScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
