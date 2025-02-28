//React Native Stateless Componant

import * as React from "react";
import { View, Image, StyleSheet, ImageProps } from "react-native";

import { SCREEN_WIDTH } from "../utils/CONST_LAYOUT";

interface HeaderImageProps {
  image: ImageProps["source"];
}

const HeaderImage = ({ image }: HeaderImageProps) => {
  return (
    <View>
      <Image source={image} style={styles.image} />
    </View>
  );
};

export default HeaderImage;

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    resizeMode: "cover",
  },
});
