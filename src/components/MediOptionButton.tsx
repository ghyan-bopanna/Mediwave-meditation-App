/* eslint-disable react-native/no-inline-styles */
import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MediText from "./Meditext";
import COLORS, { GRAY_LIGHT } from "../utils/COLORS";
import { SCREEN_WIDTH } from "../utils/CONST_LAYOUT";

interface MediOptionButtonProps {
  text: string;
  onPress: () => void;
  isSelected?: boolean;
}

const MediOptionButton = ({
  text,
  onPress,
  isSelected,
}: MediOptionButtonProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={{
      backgroundColor: isSelected ? COLORS.SURFACE_COLOR : COLORS.GRAY_LIGHT,
      width: "100%",
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginBottom: 10,
      borderColor: COLORS.PRIMARY_COLOR,
      borderWidth: isSelected ? 1 : 0,
    }}
  >
    <MediText bold center>
      {text}
    </MediText>
  </TouchableOpacity>
);

export default MediOptionButton;

const styles = StyleSheet.create({
  container: {},
});
