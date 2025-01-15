//Defines how the text input will be

import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
} from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/CONST_LAYOUT";
import COLORS, {
  TEXT_COLOR,
  TEXT_COLOR_40,
  TEXT_COLOR_60,
  TEXT_COLOR_80,
} from "../utils/COLORS";

interface MediTextInputProps extends TextInputProps {}

const MediTextInput = ({ ...restProps }: MediTextInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          height: 45,
          width: SCREEN_WIDTH * 0.85,
          borderColor: "transparent",
          borderWidth: 1,
          backgroundColor: COLORS.SURFACE_COLOR,
          borderRadius: 8,
          borderBlockColor: "transparent",
          color: COLORS.TEXT_COLOR,
          paddingHorizontal: 10,
          marginTop: 10,
        }}
        placeholderTextColor={TEXT_COLOR_60}
        {...restProps}
      />
    </View>
  );
};

export default MediTextInput;

const styles = StyleSheet.create({
  container: {},
});
