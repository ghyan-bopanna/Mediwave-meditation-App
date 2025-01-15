import * as React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import COLORS from "../utils/COLORS";
import { SCREEN_WIDTH } from "../utils/CONST_LAYOUT";

interface MediButtonProps {
  children: React.ReactNode;
  secondary?: boolean;
  style?: StyleProp<ViewStyle>; // Use ViewStyle for better type safety
  onPress?: () => void; // Add the onPress prop
}

const MediButton: React.FC<MediButtonProps> = ({
  children,
  secondary,
  style,
  onPress,
}) => {
  let backgroundColor = COLORS.PRIMARY_COLOR; // Primary button color
  if (secondary) backgroundColor = COLORS.SECONDARY_COLOR; // Secondary button color

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress} // Pass the onPress prop here
      style={[
        {
          backgroundColor,
          borderRadius: 10,
          margin: 10,
          height: 50,
          width: SCREEN_WIDTH * 0.85,
          justifyContent: "center",
          alignItems: "center",
        },
        style, // Spread custom styles
      ]}
    >
      <Text
        style={{
          color: COLORS.TEXT_COLOR,
          fontSize: 15,
          fontWeight: "600",
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default MediButton;
